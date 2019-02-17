
import Router from 'koa-router'
import { home ,test} from './controller/HomeController';
import { login } from './controller/loginCtrl';

let router = new Router();

router.get("/",home);
router.get('/login',login);

export default router;