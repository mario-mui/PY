var passport = require('koa-passport');
var esUser = require("../api/es/esUser");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, id)
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