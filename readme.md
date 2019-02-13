#  koa-react-ssr (基于koa的react 服务端渲染实践)

## 目录结构
src
├─config   :项目配置目录，包括了服务的配置 和前端webpack 配置等信息
├─controller :后端控制器
├─dist   :前端打包后的资源文件宝行了html ,css ,js ,img等静态文件
├─loaders  ： 自定义webpack loader 
├─pages : react 组件 一个组件一个页面
├─plugins : 自定义webpack 插件目录
├─util :常用工具类
└─web 

## 环境依赖


- babel-node 
  npm install babel-cli -g
- 编译react的依赖
  npm install babel-preset-react -S
  npm install babel-preset-env -S
  npm install babel-plugin-transform-decorators-legacy -S

- 监视文件变化的模块  nodemon
npm install -S nodemon

- 跨平台设置环境变量 
  npm install --save-dev cross-env
  