const staic = require('koa-static');
const koa = require('koa');
const app = koa();
const Jade = require('koa-jade');
var bodyParser = require('koa-bodyparser');

app.use(bodyParser());
const jade = new Jade({
  viewPath: './views',
  debug: false,
  pretty: false,
  compileDebug: false,
  locals: 'pinyou',
  app: app
});

/* add app route*/
require('./config/route')(app);


console.log('pinyou server is started');
/*
* set static dir
* */
app.use(staic(__dirname + '/public'));
app.use(staic(__dirname + '/bower_components'));
app.use(staic(__dirname + '/user'));


app.listen(3001);