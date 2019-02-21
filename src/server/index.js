import Koa from 'koa'
import config from '../config/app.config'
import router from './router'
import views from 'koa-views'
import koaStatic from 'koa-static';
import path from 'path';
import koaBody from 'koa-body'

const staticPath = './resource'
const app = new Koa();


app
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
  .use(router.routes())
  .listen(config.port)

console.log("your app is running on " + config.port)