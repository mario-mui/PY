var fs = require('fs');
var path = require('path');
var parse = require('co-busboy');
var shortid = require('shortid');
var Promise = require('bluebird');
var esUser = require("../es/esUser");
var passport = require("koa-passport");

const _renderUserCenterPage = function *(){
  if(this.isAuthenticated()){
    this.render('user/center/index')
  }else{
    this.session['returnTo'] = '/user/center';
    this.redirect('/login');
  }
};

const _uploadAvatar = function *(){

  var parts = parse(this);
  var part;
  var avatarPath = __dirname + '../../../user/avatar/';
  while (part = yield parts) {
    var avatarName = shortid() + '.png'
    var stream = fs.createWriteStream(path.join(avatarPath, avatarName));
    part.pipe(stream);
    this.response.status = 200;
    this.response.body = {
      "filename" : avatarName
    }
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

module.exports = {
  renderUserCenterPage  :  _renderUserCenterPage,
  uploadAvatar          :  _uploadAvatar,
  renderLoginPage       :  _renderLoginPage,
  renderRegisterPage    :  _renderRegisterPage,
  register              :  _register,
  userLogin             :  _userLogin,
  logout                :  _logout
};
