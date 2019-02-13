
import Router from 'koa-router'
import { home ,test} from './controller/HomeController';

let router = new Router();

router.get("/",home);
router.get('/test',test);

export default router;