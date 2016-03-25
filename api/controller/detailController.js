const esPY = require("../es/esPY");
const esUser = require("../es/esUser");
const _ = require('underscore');

const _getPYDetailById = function*(){
  var ctx = this;
  try {
    var pyInfo = yield esPY.getInfoById(ctx.request.body.id);
    var userInfo = yield esUser.getInfoByUserId(pyInfo._source.create_user_id);
    var resInfo = _.extend(pyInfo._source,userInfo._source);
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
  if(!(_.has(ctx.session,'passport')) || _.isEmpty(ctx.session.passport)){
    ctx.throw(400,'not login');
  }
  if (ctx.session.passport == ctx.request.body.createPYUserId){
    ctx.throw(400,'the same people');
  }
  var _PYInfo = {
    py_info_id:ctx.request.body.PYInfoId,
    apply_user_id:ctx.session.passport.user,
    apply_attr:ctx.request.body.applyAttr,
    apply_count:ctx.request.body.applyNum,
    apply_state:false
  };
  try {
    esPY.applyPY(_PYInfo);
  }catch (err){
    ctx.throw(400,err);
  }
  ctx.status = 200;
};

module .exports ={
  renderDetailPage    :   _renderDetailPage,
  getPYDetailById     :   _getPYDetailById,
  applyPY             :   _applyPY
};