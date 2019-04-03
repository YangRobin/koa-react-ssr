
import Router from 'koa-router'
import ArticleApi from './controller/ArticleApi';
import { home } from './controller/HomeCtrl';
import UserApi from './controller/UserApi';
import { login ,loginIn } from './controller/loginCtrl';
import upload from './controller/uploadCtrl';
import { admin } from './controller/AdminCtrl'
import { detail } from './controller/DetailCtrl'
import { queryConfigList } from './controller/ArticleConfigApi'
let router = new Router();


//controller which render html for client 
router.get('/', home);
router.get('/login', login);
router.get('/admin', admin);
router.get('/detail/:id', detail);
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
router.get("/api/queryConfigList",queryConfigList)


export default router;
