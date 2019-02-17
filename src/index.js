import Koa from 'koa'
import config from './config/app.config'
import router from './router'
import views from 'koa-views'
import koaStatic from 'koa-static';
import path from 'path';

const staticPath = './dist'
const app = new Koa();


app
  .use(views(__dirname + '/dist'))
  .use(koaStatic(
    path.join(__dirname, staticPath)
  ))
  .use(router.routes())
  .listen(config.port)

console.log("your app is running on " + config.port)