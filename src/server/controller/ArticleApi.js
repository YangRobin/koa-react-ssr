/**
 * @author robin.yang
 * @description all method in file  named like  **Ctrl.js  will be a middleware for koa-router and retrun 
 * type is json ,in another words ,restful controller.
 */

import userService from '../services/userServiceFacade'
import articleService from '../services/ArticleServiceFacade'

class ArticleApi {

  /**
   *   request url /queryUserByNameAndPassword
   *   return the user information which type is json
   */
  async queryAllArticle(ctx, next) {
     
    var res = await articleService.getAllArticle();
    var id = await articleService.addArticle({
      type: 'article',
      title: "test",
      content: "robin",
      creator: "dd",
      createTime: "ddd",
      gmtModify: "ddd",
      cover: 'ddd',
      discard: 1,
    })
    ctx.body = res;
  }
  /**
   * qeury article by page
   */
  async queryArticleByPage(ctx, next) {
    const { page, pageSize } = JSON.parse(ctx.request.body);
    const res = await articleService.queryArticleByPage(page, pageSize)
    ctx.body = {
      success: true,
      result: res,
    }
  }

  /**
   * 
   * @param {*} page 
   * @param {*} pageSize 
   * 
   */
  async loadQuery(ctx, next) {

    const { page, pageSize } = JSON.parse(ctx.request.body)

    let data = [];
    let res = {}
    try {
      data = await articleService.loadquery(page, pageSize);
      for (let i = 0; i < data.length; i++) {
        data[i].creator = await userService.queryUserById(data[i].creator);
      }
      if (data.length === pageSize) {
        res.hasNext = true;
        res.data = data.slice(0, pageSize - 1);
      } else {
        res.hasNext = false;
        res.data = data;
      }
      ctx.body = res;
    } catch (err) {
      res.error = err
      ctx.body = res;
    }
  }


  async addArticle(ctx, next) {
    // articleService.addArticle()
    const article = JSON.parse(ctx.request.body)
    const user = ctx.session.user
    article.discard = 0
    article.creator = user.id;
    let res = await articleService.addArticle(article);
    if (res) {
      ctx.body = {
        success: true,
        id: res.insertId
      }
    }
  }
}
export default new ArticleApi();