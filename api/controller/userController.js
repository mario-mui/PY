const fs = require('fs');
const _ = require('underscore');
const path = require('path');
const parse = require('co-busboy');
const shortid = require('shortid');
const Promise = require('bluebird');
const esUser = require("../es/esUser");
const passport = require("koa-passport");


const _renderUserCenterPage = function *(){
  //if(this.isAuthenticated()){
    this.render('user/center/index')
//}else{
//    this.session['returnTo'] = '/user/center';
//    this.redirect('/login');
//  }
};

const _uploadAvatar = function *(){
  var ctx = this;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  var userId = ctx.session.passport.user;
  var parts = parse(this);
  var part;
  var avatarPath = __dirname + '../../../user/avatar/';
  var avatarName = {}
  while (part = yield parts) {
    var fns = part.filename.split('.');
    var extend = fns[fns.length-1];
    avatarName = shortid() + '.' +extend;
    var stream = fs.createWriteStream(path.join(avatarPath, avatarName));
    part.pipe(stream);
  }
  var userInfo = {
    avatar:avatarName
  };
  try{
    yield esUser.saveUserInfoById(userId,userInfo);
  }catch (err){
    ctx.throw(400,err)
  }
  ctx.body = {
    "filename" : avatarName
  }
};

const _renderLoginPage = function * (){
  if(this.isAuthenticated()){
    this.redirect('/')
  }else{
    this.render('user/login/index')
  }
};

const _renderRegisterPage = function * (){
  this.render('user/register/index')
};

const _register = function* (){
  esUser.registerUser = Promise.promisify(esUser.registerUser);
  const registerInfo = this.request.body.userRegister;
  try {
    const res = yield esUser.registerUser(registerInfo);
    this.response.body = res;
  }
  catch (err){
    this.response.status = 500;
  }
};

const _userLogin = function*(next){
  var ctx = this;
  yield passport.authenticate('local', function*(err, user, info) {
    if (err) throw err;
    if (user === false) {
      ctx.status = 401;
      ctx.body = { success: false}
    } else {
      yield ctx.login(user);
      ctx.body = { success: true ,returnTo:ctx.session.returnTo}
    }
  }).call(this, next)
};

const _logout = function* (){
  this.logout();
  this.redirect('/');
};

const _getUserInfo = function*(){
  const ctx = this;
  if(!ctx.isAuthenticated()){
    ctx.throw(400,'not login');
  }
  var userId = ctx.session.passport.user;
  try {
    var userInfo = yield esUser.getInfoByUserId(userId);
  }catch (err){
    ctx.throw(400,err);
  }

  ctx.body = userInfo._source;

};

const _saveUserInfo = function*(){
  const ctx = this;
  if(!(_.has(ctx.session,'passport')) || _.isEmpty(ctx.session.passport)){
    ctx.throw(400,'not login');
  }
  var userId = ctx.session.passport.user;
  var _userInfo = ctx.request.body;
  try {
    yield esUser.saveUserInfoById(userId,_userInfo);
  }catch (err){
    ctx.throw(400,err);
  }
  ctx.status = 200;
};

module.exports = {
  renderUserCenterPage  :  _renderUserCenterPage,
  uploadAvatar          :  _uploadAvatar,
  renderLoginPage       :  _renderLoginPage,
  renderRegisterPage    :  _renderRegisterPage,
  register              :  _register,
  userLogin             :  _userLogin,
  logout                :  _logout,
  getUserInfo           :  _getUserInfo,
  saveUserInfo          :  _saveUserInfo
};
