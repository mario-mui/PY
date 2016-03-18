const staic = require('koa-static');
const koa = require('koa');
const app = koa();


//session
var session = require('koa-generic-session');
app.keys = ['py-session'];
app.use(session());

//body parser
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//authentication
require('./config/auth');
var passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

const Jade = require('koa-jade');
const jade = new Jade({
  viewPath: './views',
  debug: false,
  pretty: false,
  compileDebug: false,
  locals: 'pinyou',
  app: app
});

/* add app route*/
const route = require('./config/route');
app.use(route.middleware());

//app.use(function*(next) {
// console.log(this.session)
//  if (this.isAuthenticated()) {
//    yield next
//  } else {
//    this.redirect('/login')
//  }
//});

console.log('pinyou server is started');
/*
* set static dir
* */
app.use(staic(__dirname + '/public'));
app.use(staic(__dirname + '/bower_components'));
app.use(staic(__dirname + '/user'));


app.listen(3001);