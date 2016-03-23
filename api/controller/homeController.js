const esHome = require("../es/esHome");
const esUser = require("../es/esUser");
const _ = require('underscore');
const userImgPath = '/userImg/';


const _getPYList = function*(){
  var ctx = this;
  var res = yield esHome.getPYByOffset(ctx.request.body.search,ctx.request.body.from);
  var resList = _.map(res.hits.hits,function(hit){
    return {
      id:hit._id,
      title:hit._source.title,
      imgs: _.map(hit._source.good_imgs,function(img){return userImgPath+img}),
      desc:hit._source.good_desc,
      createTime:hit._source.create_time
    };
  });
  ctx.body = resList;
};

const _getPYDetailById = function*(){
  var ctx = this;
  try {
    var pyInfo = yield esHome.getInfoById(ctx.request.body.id);
    var userInfo = yield esUser.getInfoByUserId(pyInfo._source.create_user_id);
    var resInfo = _.extend(pyInfo._source,userInfo._source);
  } catch(err){
    ctx.throw(401);
  }
  ctx.body = resInfo
};

const _renderHomePage = function *(){
  this.render('home/main')
};

module.exports = {
  renderHomePage    :   _renderHomePage,
  getPYList         :   _getPYList,
  getPYDetailById   :   _getPYDetailById
};
