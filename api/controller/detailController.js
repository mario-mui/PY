const esPY = require("../es/esPY");
const esUser = require("../es/esUser");
const _ = require('lodash');
const moment = require("moment");

const _getPYDetailById = function*(){
  var ctx = this;
  try {
    var pyInfo = yield esPY.getInfoById(ctx.request.body.id);
    var userInfo = yield esUser.getInfoByUserId(pyInfo._source.create_user_id);
    var applyYesInfo = yield esPY.getCountApplyByStatue(pyInfo._id,'pass');
    var resInfo = _.assignIn(pyInfo._source,userInfo._source);
    resInfo = _.assignIn(resInfo,{applyYesNum:applyYesInfo.aggregations.sum_apply.value})
  } catch(err){
    ctx.throw(401);
  }
  ctx.body = resInfo
};

const _renderDetailPage = function*(){
  try {
    yield esPY.getInfoById(this.params.id);
    this.render('detail/index');
  } catch(err){
    this.redirect('/');
  }
};

const _applyPY = function *(){
  var  ctx = this;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  var user = ctx.session.passport.user;
  if (user.id == ctx.request.body.createPYUserId){
    ctx.throw(400,'the same people');
  }
  var _PYInfo = {
    py_info_id:ctx.request.body.PYInfoId,
    apply_user_id:user.id,
    apply_user_name:user.username,
    apply_attr:ctx.request.body.applyAttr,
    apply_count:ctx.request.body.applyNum,
    apply_state:'waiting'//新建初始状态
  };
  try {
    yield esPY.applyPY(_PYInfo);
  }catch (err){
    ctx.throw(400,err);
  }
  ctx.status = 200;
};

const _getComment = function*(){
  var ctx = this;
  var commentList = []
  var infoId = ctx.request.body.infoId;
  try{
    var comments = yield esPY.getComment(infoId);
    if (comments.hits.hits.length > 0){
      var userIds = _.uniq(_.map(comments.hits.hits, '_source.user_id'));
      var userInfoRes = yield esUser.getInfoByUserIds(userIds);
      var userInfoList = _.keyBy(userInfoRes.hits.hits,"_id");
      commentList = _.map(comments.hits.hits,function(comment){
        return {
          content:comment._source.content,
          rate:comment._source.rate,
          time:comment._source.time,
          user:userInfoList[comment._source.user_id]._source
        }
      })
    }
  }catch (err){
    ctx.throw(400,err);
  }
  ctx.body = commentList
};

const _postComment = function*(){
  var  ctx = this;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  var user = ctx.session.passport.user;
  if (user.id == ctx.request.body.createPYUserId){
    ctx.throw(400,'the same people');
  }

  var comment = {
    py_info_id:ctx.request.body.PYInfoId,
    user_id:user.id,
    content:ctx.request.body.content,
    rate:ctx.request.body.rate,
    time:moment().valueOf()
  };

  try{
    yield esPY.postComment(comment)
  }
  catch (err){
    ctx.throw(400,err)
  }
  ctx.status = 200

};

module .exports ={
  renderDetailPage    :   _renderDetailPage,
  getPYDetailById     :   _getPYDetailById,
  applyPY             :   _applyPY,
  getComment          :   _getComment,
  postComment         :   _postComment
};