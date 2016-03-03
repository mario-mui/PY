const controllerPath = __dirname + "/../api/controller/"

/* include ctl here*/
const homeCtl = require(controllerPath+"homeController")

var Router = require('koa-router');
function register (app) {
  var router = new Router();
  /* add route here*/
  router.get('/',homeCtl.renderHomePage)

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register
