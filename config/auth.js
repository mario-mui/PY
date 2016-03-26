var passport = require('koa-passport');
var esUser = require("../api/es/esUser");

passport.serializeUser(function(user, done) {
  var userInfo= {
    id:user.id,
    username:user.username
  };
  done(null, userInfo);
});

passport.deserializeUser(function(user, done) {
  done(null,user)
});

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {
  esUser.login(username,password,function(err,user){
    if(err){
      done(null, false)
    }else{
      done(null, user)
    }
  });
}));