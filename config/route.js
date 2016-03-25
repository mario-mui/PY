const controllerPath = __dirname + "/../api/controller/";

/* include ctl here*/
const homeCtl = require(controllerPath+"homeController");
const postCtl = require(controllerPath+"postController");
const userCtl = require(controllerPath+"userController");
const comCtl = require(controllerPath+"commonController");
const detailCtl = require(controllerPath+"detailController");


var Router = require('koa-router');
var router = new Router();

/* add route here*/
/* get method*/
router.get('/',homeCtl.renderHomePage);
router.get('/post',postCtl.renderPostPage);
router.get('/user/center',userCtl.renderUserCenterPage);
router.get('/login',userCtl.renderLoginPage);
router.get('/register',userCtl.renderRegisterPage);
router.get('/user/logout',userCtl.logout);
router.get('/py/attr.json',postCtl.getAllAttr);
router.get('/py/detail/:id',detailCtl.renderDetailPage);

/* post method */
router.post('/user/upload/avatar',userCtl.uploadAvatar);
router.post('/post/upload/imgs',postCtl.uploadImgs);
router.post('/user/register',userCtl.register);
router.post('/user/login',userCtl.userLogin);
router.post('/pyInfo/post.json',postCtl.postPY);
router.post('/delete/user/img.json',comCtl.deleteUserImgs);
router.post('/get/py/list.json',homeCtl.getPYList);
router.post('/get/py/detail.json',detailCtl.getPYDetailById);
router.post('/apply/py.json',detailCtl.applyPY);


module.exports = router;
