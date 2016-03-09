const controllerPath = __dirname + "/../api/controller/"

/* include ctl here*/
const homeCtl = require(controllerPath+"homeController")
const postCtl = require(controllerPath+"postController")
const userCtl = require(controllerPath+"userController")


var Router = require('koa-router');
function register (app) {
  var router = new Router();
  /* add route here*/

  router.get('/',homeCtl.renderHomePage)
  router.get('/post',postCtl.renderPostPage)
  router.get('/user/center',userCtl.renderUserCenterPage)

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register
