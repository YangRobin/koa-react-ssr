
import Router from 'koa-router'
import { home } from './controller/HomeCtrl';
import { login } from './controller/loginCtrl';
import  UserApi from './controller/UserApi'

let router = new Router();


//controller which render html for client 
router.get("/",home);
router.get('/login',login);

//restful api 
router.get("/queryUserByNameAndPassword",UserApi.queryUserByNameAndPassword)

export default router;