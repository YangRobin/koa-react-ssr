
import Vue from 'vue'
import Router from 'vue-router'
import AddArticle from './pages/AddArticle'
import ArticleManager from './pages/ArticleManager';
import ArticleConfig from './pages/ArticleConfig'
Vue.use(Router)


const router = new Router({
  mode: 'hash',
  routes: [
    //登录路由
    {
      path: '/article-manager',
      name: 'article-manager',
      component: ArticleManager,
    },
    {
      path: '/add-article/:id',
      name: 'add-article',
      component: AddArticle,
    },
    {
      path: '/article-config/',
      name: 'article-config',
      component: ArticleConfig,
    }
  ]
})


export default router;

