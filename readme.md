##  koa-react-ssr (基于koa的react 服务端渲染实践)

### 目录结构
``` javascript
src
├─config   :项目配置目录，包括了服务的配置 和前端webpack 配置等信息
├─controller :后端控制器
├─dist   :前端打包后的资源文件宝行了html ,css ,js ,img等静态文件
├─loaders  ： 自定义webpack loader 
├─pages : react 组件 一个组件一个页面
├─plugins : 自定义webpack 插件目录
├─service: 通用数据接口
├─util :常用工具类
└─web 
```

### 环境依赖


- babel-node 
  npm install babel-cli -g


#### 前端 打包命令
  npm build  运行该命令后webpack会一直监听pages目录下的资源 如果有变化 会自动打包 资源到dist。
  
#### 启动后端服务
  npm run server  启动后端 服务
#### 需要注意的点
  <p><strong>1.
    当我们再pages下新建一个react 组件(必须是UIComponent)时，webpack会
    自动打包一个同名的html文件 和js 文件。并且html中 会默认注入同名的js。
  </strong></p>
  <p><strong>2.pages下的每个js文件都会打包成一个html文件,in another words 就是这里的组件就是用来渲染视图的.再打包过程种, 框架会 调用 renderToString 方法把 该目录下的 react 组件渲染成html供后端使用。</strong></p>
  <p><strong>
    3.pages下的js文件必须返回的是一个React 组件并且是UIComponent
  </strong></p>



  