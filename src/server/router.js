
import Router from 'koa-router'
import { home } from './controller/HomeCtrl';
import { login ,loginIn } from './controller/loginCtrl';
import UserApi from './controller/UserApi';
import upload from './controller/uploadCtrl';
import ArticleApi from './controller/ArticleApi';
import { admin } from './controller/AdminCtrl'


let router = new Router();


//controller which render html for client 
router.get('/', home);
router.get('/login', login);
router.get('/admin', admin);
//restful api 
router.post('/api/enter',loginIn);
router.post('/api/upload', upload);
router.post('/api/loadQuery', ArticleApi.loadQuery)
router.post('/api/addArticle', ArticleApi.addArticle)
router.post('/api/updateArticle', ArticleApi.updateArticle)
router.post('/api/queryArticleById', ArticleApi.queryArticleById)
router.post('/api/queryArticleByPage',ArticleApi.queryArticleByPage)
router.get('/api/queryUserByNameAndPassword', UserApi.queryUserByNameAndPassword)
router.get('/api/queryAllArticle', ArticleApi.queryAllArticle)


export default router;
