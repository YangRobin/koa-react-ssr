### koa-react-ssr (基于koa的react 服务端渲染实践)

### 如何启动 
  注:流程可能比较麻烦 ,后期会 把整个 启动流程 封装 成一个 nodejs 命令行发布到npm上 .
  启动三个terminal 按顺序 执行以下命令
 ``` shell  
    npm run dev   //会把 /src/pages目录下的React 组件render 成html 到template目录下
    npm run build  // 打包前端资源 到dist 下 ，依赖上一步 生成的html 文件
    npm run server  // 启动后端服务
  ```

  如果还报错 请执行如下命令 加载自定义 shell命令  react2html 
  ```shell
     npm install -g 
     npm link 
  ```



##### 目录结构
``` javascript
├─config
├─server //后端目录路
│  ├─controller
│  ├─middleware
│  ├─resource
│  └─services
├─util   //通用工具目录
│  ├─loaders  //webpack loader
│  └─plugins  //webpack plugin
└─web     //前端目录
    ├─common     
    ├─components //react 组件
    └─pages     //pages 目录下的文件最终打包成静态资源 丢给服务端的 resource 目录 以供服务端渲染
        ├─admin   //admin目录下 是vue单页应用,包含了vue路由store等所有的配置，开发后台的时候 npm run admin 可以单独启动项目
        │  ├─components //vue通用组件
        │  └─pages   //vue 通用页面组件
        ├─detail  // detail ,home ,login是react 生产的页面
        ├─home  
        └─login

```

##### 环境依赖


- babel-node 
  npm install babel-cli -g


##### 前端 打包命令
  npm build  运行该命令后webpack会一直监听pages目录下的资源 如果有变化 会自动打包 资源到dist。
  
##### 启动后端服务
  npm run server  启动后端 服务
##### 需要注意的点
  <p><strong>1.
    当我们再pages下新建一个react 组件(必须是UIComponent)时，webpack会
    自动打包一个同名的html文件 和js 文件。并且html中 会默认注入同名的js。
  </strong></p>
  <p><strong>2.pages下的每个js文件都会打包成一个html文件,in another words 就是这里的组件就是用来渲染视图的.再打包过程种, 框架会 调用 renderToString 方法把 该目录下的 react 组件渲染成html供后端使用。</strong></p>
  <p><strong>
    3.pages下的js文件必须返回的是一个React 组件并且是UIComponent
  </strong></p>



  