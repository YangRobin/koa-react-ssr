
import Vue from 'vue'
import Router from 'vue-router'
import test from './pages/test'
Vue.use(Router)


const router = new Router({
  mode:'hash',
  routes: [
    //登录路由
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})


export default router;

