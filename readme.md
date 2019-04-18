### koa-react-ssr (基于koa的react 服务端渲染实践)
### 难点
#### 1.window 对象在服务端不可用
      前后端同构时,renderToString 方法在渲染组件时会执行componentDidmount之前的所有生命周期。
      在这些什么周期中是不能window的，因为webpack打包时
    的环境是nodejs 环境，拿不到window.
-   解决方法：判断window是否存在
 ``` javascript
  if (typeof window !== "undefined") {
    // Grab the state from a global variable injected into the server-generated HTML
    const preloadedState = window.__PRELOADED_STATE__
    // Allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__

    ReactDom.hydrate(<App />, document.getElementById('root'))
  }
 ```
#### 2.css module的解析
    和上一个问题一样，nodejs 解析jsx文件时，遇到 import "a.css"是 没法解析css文件
-  解决方法：css-require-modules-hooks 
####  3.前端资源热更新
    服务端渲染 的最终目的就是把jsx文件渲染成静态文件。那么前段开发完 如何实时地打包同步到后端呢？
-    解决方法：自定义脚本react2html
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
├─server                  //后端目录路
│  ├─controller
│  ├─middleware
│  ├─resource
│  └─services
├─util                    //通用工具目录
│  ├─loaders              //webpack loader
│  └─plugins              //webpack plugin
└─web                     //前端目录
    ├─common     
    ├─components          //react 组件
    └─pages               //pages 目录下的文件最终打包成静态资源 丢给服务端的 resource 目录 以供服务端渲染
        ├─admin           //admin目录下 是vue单页应用,包含了vue路由store等所有的配置，
                                   开发后台的时候 npm run admin 可以单独启动项目
        │  ├─components   //vue通用组件
        │  └─pages        //vue 通用页面组件
        ├─detail          // detail ,home ,login是react 生产的页面
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



  
