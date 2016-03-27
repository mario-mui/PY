const controllerPath = __dirname + "/../api/controller/";

/* include ctl here*/
const homeCtl = require(controllerPath+"homeController");
const postCtl = require(controllerPath+"postController");
const userCtl = require(controllerPath+"userController");
const comCtl = require(controllerPath+"commonController");
const detailCtl = require(controllerPath+"detailController");
const pyACtl = require(controllerPath+"pyActionController");


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
router.get('/total/py/list.json',pyACtl.getTotalMyPYList);
router.get('/total/my/apply/list.json',pyACtl.getTotalMyApplyList);

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
router.post('/user/info.json',userCtl.getUserInfo);
router.post('/save/user/info.json',userCtl.saveUserInfo);
router.post('/get/my/py/list.json',pyACtl.getMyPYList);
router.post('/apply/action/yes.json',pyACtl.applyActionYes);
router.post('/apply/action/no.json',pyACtl.applyActionNo);
router.post('/py/action/complete.json',pyACtl.completePY);
router.post('/py/action/delete.json',pyACtl.deletePY);
router.post('/get/my/apply/list.json',pyACtl.getMyApplyList);
router.post('/cancel/my/apply.json',pyACtl.cancelMyApply);

module.exports = router;
