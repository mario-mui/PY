const controllerPath = __dirname + "/../api/controller/";

/* include ctl here*/
const homeCtl = require(controllerPath+"homeController");
const postCtl = require(controllerPath+"postController");
const userCtl = require(controllerPath+"userController");


var Router = require('koa-router');
var router = new Router();

/* add route here*/
/* get method*/
router.get('/',homeCtl.renderHomePage);
router.get('/post',postCtl.renderPostPage);
router.get('/user/center',userCtl.renderUserCenterPage);
router.get('/login',userCtl.renderLoginPage);
router.get('/register',userCtl.renderRegisterPage);

/* post method */
router.post('/user/upload/avatar',userCtl.uploadAvatar);
router.post('/user/register',userCtl.register);
router.post('/user/login',userCtl.userLogin);


module.exports = router;
