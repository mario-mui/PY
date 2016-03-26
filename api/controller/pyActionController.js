const _ = require('lodash');
const esPY = require('../es/esPY');

const _getMyPYList = function*(){
  const ctx = this;
  //if(!ctx.isAuthenticated()){
  //  ctx.throw(400,'not login');
  //}
  //const user = ctx.session.passport.user;
  try {
    var myPYList = yield esPY.getMyPYList('AVOuCdp-NePq--OmSLiL',0,10);
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
  //if(!ctx.isAuthenticated()){
  //  ctx.throw(400,'not login');
  //}
  //const user = ctx.session.passport.user;
  try {
    var totalHit = yield esPY.getTotalMyCreatePYList('AVOuCdp-NePq--OmSLiL');
  }catch (err){
    ctx.throw(400,err);
  }
  ctx.body = totalHit.count;
};

const _applyActionYes = function*(){
  const ctx = this;
  const req = ctx.request.body;
  //if(!ctx.isAuthenticated()){
  //  ctx.throw(400,'not login');
  //}
  //const user = ctx.session.passport.user;
  try{
    var pyInfo = yield esPY.getUserId(req.pyId);
    console.log('#####',pyInfo);
  }catch(err){

  }

};

module.exports = {
  getMyPYList           :   _getMyPYList,
  getTotalMyPYList      :   _getTotalMyPYList,
  applyActionYes        :   _applyActionYes
};
