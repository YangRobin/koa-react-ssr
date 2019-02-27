import Koa from 'koa'
import config from '../config/app.config'
import router from './router'
import views from 'koa-views'
import koaStatic from 'koa-static';
import path from 'path';
import koaBody from 'koa-body';
import session from 'koa-session';
import LoginMidware from './middleware/LoginMidware';
import bodyParser from 'koa-bodyparser';

const staticPath = './resource'
const app = new Koa();


app
  .use(bodyParser())
  .use(session({
    key: 'koa:sess', /** cookie的名称，可以不管 */
    maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
  }, app))
  .use(views(__dirname + '/resource'))
  .use(koaStatic(
    path.join(__dirname, staticPath)
  ))
  
  .use(koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
  }))
  // .use(LoginMidware)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port)

console.log("your app is running on " + config.port)