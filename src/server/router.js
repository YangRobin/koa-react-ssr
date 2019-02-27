
import Router from 'koa-router'
import { home } from './controller/HomeCtrl';
import { login } from './controller/loginCtrl';
import UserApi from './controller/UserApi';
import upload from './controller/uploadCtrl';
import ArticleApi from './controller/ArticleApi';
import { admin } from './controller/AdminCtrl'


let router = new Router();


//controller which render html for client 
router.get("/", home);
router.get('/login', login);
router.get("/admin", admin)
//restful api 
router.post('/upload', upload);
router.post('/loadQuery',ArticleApi.loadQuery)
router.get("/queryUserByNameAndPassword", UserApi.queryUserByNameAndPassword)
router.get("/queryAllArticle", ArticleApi.queryAllArticle)

export default router;
