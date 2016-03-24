const esHome = require("../es/esPY");
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

const _renderHomePage = function *(){
  this.render('home/main')
};

module.exports = {
  renderHomePage    :   _renderHomePage,
  getPYList         :   _getPYList
};
