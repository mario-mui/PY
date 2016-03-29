const _ = require('lodash');
const esPY = require('../es/esPY');
const comMap = require('../common/pyInfoMap');

const _getMyPYList = function*(){
  const ctx = this;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  const user = ctx.session.passport.user;
  var page = parseInt(ctx.request.body.page);
  var from = (page-1)*comMap.myPyPageSize;
  try {
    var myPYList = yield esPY.getMyPYList(user.id,from,comMap.myPyPageSize);
    var PYInfoIds = _.map(myPYList.hits.hits, '_id');
    var applyList = yield esPY.getApplyListByPYIds(PYInfoIds);
    var resMyPYList = _.map(myPYList.hits.hits,function(_myPY){
      var applyListByPYId = _.map(applyList.hits.hits,function(apply){
        if(_myPY._id == apply._source.py_info_id){
          return {
            applyId:apply._id,
            applyUserName:apply._source.apply_user_name,
            applyAttr:apply._source.apply_attr,
            applyCount:apply._source.apply_count,
            applyState:apply._source.apply_state
          }
        }
      });
      return {
        id:_myPY._id,
        title:_myPY._source.title,
        count:_myPY._source.count,
        applyList:applyListByPYId
      }
    });
  }catch(err){
    ctx.throw(400,err)
  }
  ctx.body = resMyPYList;
};

const _getTotalMyPYList = function*(){
  const ctx = this;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  const user = ctx.session.passport.user;
  try {
    var totalHit = yield esPY.getTotalMyCreatePYList(user.id);
  }catch (err){
    ctx.throw(400,err);
  }
  ctx.body = totalHit.count;
};

const _applyActionYes = function*(){
  const ctx = this;
  const req = ctx.request.body;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  const user = ctx.session.passport.user;
  try{
    var pyInfo = yield esPY.getUserId(req.pyId);
    if(pyInfo._source.create_user_id != user.id){
      ctx.throw(400,'not your py');
    }
    yield esPY.applyActionYes(req.applyId);
  }catch(err){
    ctx.throw(400,err);
  }
  ctx.status = 200;

};

const _applyActionNo = function*(){
  const ctx = this;
  const req = ctx.request.body;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  const user = ctx.session.passport.user;
  try{
    var pyInfo = yield esPY.getUserId(req.pyId);
    if(pyInfo._source.create_user_id != user.id){
      ctx.throw(400,'not your py');
    }
    yield esPY.applyActionNo(req.applyId);
  }catch(err){
    ctx.throw(400,err);
  }
  ctx.status = 200;
};

const _completePY = function*(){
  const ctx = this;
  var req = ctx.request.body;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  const user = ctx.session.passport.user;
  try{
    var pyInfo = yield esPY.getUserId(pyId);
    if(pyInfo._source.create_user_id != user.id){
      ctx.throw(400,'not your py');
    }
    yield esPY.completePY(req.pyId);
  }catch(err){
    ctx.throw(400,err);
  }
  ctx.status = 200;
};

const _deletePY = function*(){
  const ctx = this;
  const req = ctx.request.body;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  const user = ctx.session.passport.user;
  try{
    var pyInfo = yield esPY.getUserId(req.pyId);
    if(pyInfo._source.create_user_id != user.id){
      ctx.throw(400,'not your py');
    }
    var applyList = yield esPY.getAllApplyListByPYIds([req.pyId]);
    var deleteApplyBody = [];
    _.map(applyList.hits.hits,function(apply){
      deleteApplyBody.push({ update: { _index: 'py_tpl', _type: 'py_apply', _id: apply._id } });
      deleteApplyBody.push({doc:{apply_state:'py_delete'}});
    });
    yield esPY.deletePY(req.pyId);
    yield esPY.deleteApplyByIds(deleteApplyBody);

  }catch(err){
    ctx.throw(400,err);
  }
  ctx.status = 200;
};

const _getMyApplyList = function*(){
  const ctx = this;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  var page = parseInt(ctx.request.body.page);
  var from = (page-1)*comMap.myApplyPageSize;
  const user = ctx.session.passport.user;
  try {
    var myApplyListHit = yield esPY.getMyApplyList(user.id,from,comMap.myApplyPageSize);
    var PYInfoIds = _.map(myApplyListHit.hits.hits, '_source.py_info_id');
    var pyListMyApplyHit = yield esPY.getPyInfoByIds(_.uniq(PYInfoIds));
    var myApplyList = _.map(myApplyListHit.hits.hits,function(myApply){
      var pyMyApply = _.find(pyListMyApplyHit.hits.hits,{_id:myApply._source.py_info_id});
      return {
        id:myApply._id,
        pyId:pyMyApply._id,
        pyTitle:pyMyApply._source.title,
        applyAttr:myApply._source.apply_attr,
        applyCount:myApply._source.apply_count,
        applyState:comMap.applyStateMap[myApply._source.apply_state]
      };
    })

  }catch(err){
    ctx.throw(400,err);
  }
  ctx.body = myApplyList;
};

const _getTotalMyApplyList = function*(){
  const ctx = this;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  const user = ctx.session.passport.user;
  try {
    var totalHit = yield esPY.getTotalMyApply(user.id);
  }catch (err){
    ctx.throw(400,err);
  }
  ctx.body = totalHit.count;
};

const _cancelMyApply = function*(){
  const ctx = this;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  const user = ctx.session.passport.user;
  try {
    var applyInfo = yield esPY.getApplyInfoById(ctx.request.body.applyId);
    if(applyInfo._source.apply_user_id != user.id){
      ctx.throw(400,'not the same user');
    }else{
      yield esPY.deleteMyApply(ctx.request.body.applyId);
    }
  }catch(err){
    ctx.throw(400,err);
  }
  ctx.status = 200;
};

module.exports = {
  getMyPYList           :   _getMyPYList,
  getTotalMyPYList      :   _getTotalMyPYList,
  applyActionYes        :   _applyActionYes,
  applyActionNo         :   _applyActionNo,
  completePY            :   _completePY,
  deletePY              :   _deletePY,
  getMyApplyList        :   _getMyApplyList,
  getTotalMyApplyList   :   _getTotalMyApplyList,
  cancelMyApply         :   _cancelMyApply
};
