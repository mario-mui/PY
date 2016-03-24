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
  console.log(this.params.id);
  try {
    yield esPY.getInfoById(this.params.id);
    this.render('detail/index');
  } catch(err){
    this.redirect('/');
  }
};

module .exports ={
  renderDetailPage    :   _renderDetailPage,
  getPYDetailById     :   _getPYDetailById
};