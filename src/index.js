

import Koa from 'koa'
import config from './config/app.config'
import router from './router'
import views from 'koa-views'
import koaStatic from 'koa-static';
import path from 'path';

const staticPath = './dist'
const app = new Koa();

// 加载模板引擎
app.use(views(__dirname + '/dist'));

app.use(koaStatic(
  path.join( __dirname, staticPath)
))

app.use(router.routes())
app.listen(config.port)

console.log("your app is running  "+ config.port)
