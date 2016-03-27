const esPost = require("../es/esPost");
const _ = require('underscore');
const parse = require('co-busboy');
const shortid = require('shortid');
const fs = require('fs');
const path = require('path');
const moment = require("moment");


const _renderPostPage =function *(){
  if(this.isAuthenticated()){
    this.render('postPage/index');
  }else{
    this.session['returnTo'] = '/post';
    this.redirect('/login');
  }
};

const _uploadImgs = function *(){

  var parts = parse(this);
  var part;
  var imgPath = __dirname + '../../../user/userImg/';
  var userimgs = [];
  while (part = yield parts) {
    var fns = part.filename.split('.');
    var extend = fns[fns.length-1];
    var imgName = shortid() + '.' + extend;
    userimgs.push(imgName);
    var stream = fs.createWriteStream(path.join(imgPath, imgName));
    part.pipe(stream);
  }
  this.body = userimgs;
};


const _postPY = function *(){
  const ctx = this;
  const postInfo = ctx.request.body;
  if(!ctx.isAuthenticated()){
    ctx.throw(401,'not login');
  }
  const user = ctx.session.passport.user;
  if(postInfo.title.length > 30){
    ctx.throw(401);
  }
  if(postInfo.link.length > 150){
    ctx.throw(401);
  }
  if(postInfo.desc.length > 400){
    ctx.throw(401);
  }
  const pyInfo = {
    create_user_id:user.id,
    title:postInfo.title,
    deadline:parseInt(moment(postInfo.deadline).format('x')),
    create_time:moment().valueOf(),
    count:postInfo.count,
    price:postInfo.price,
    arrive_date:postInfo.arriveDate,
    good_brand:postInfo.goodBrand,
    good_from:postInfo.goodFrom,
    good_link:postInfo.link,
    good_desc:postInfo.desc,
    good_attr:postInfo.attr,
    good_imgs:postInfo.imgs,
    py_state:'open'
  };
  try{
    yield esPost.postPYInfo(pyInfo);
    ctx.body = pyInfo.title;
  }catch (err){
    ctx.throw(401);
  }
};

const _getAllAttr = function *() {
  var attrObjs = yield esPost.getAllAttr();
  var attrObj = {};
  _.map(attrObjs,function(v){
    const a = {};
    a[v._source.attr_key] = v._source.attr_value;
    attrObj = _.extend(attrObj,a);
  });
  this.body = attrObj;
};

module.exports = {
  renderPostPage   :   _renderPostPage,
  getAllAttr       :   _getAllAttr,
  postPY           :   _postPY,
  uploadImgs       :   _uploadImgs
};
