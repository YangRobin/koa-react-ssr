
import Vue from 'vue'
import Router from 'vue-router'
import AddArticle from './pages/AddArticle'
import ArticleManager from './pages/ArticleManager';
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
      path: '/add-article',
      name: 'add-article',
      component: AddArticle,
    }
  ]
})


export default router;

