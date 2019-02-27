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
    console.log(ctx.request.query)
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
    const { page, pageSize } = ctx.request.query;
    ctx.query = await articleService.queryArticleByPage(page, pageSize)
  }

  /**
   * 
   * @param {*} page 
   * @param {*} pageSize 
   * 
   */
  async loadQuery(ctx, next) {

    const { page, pageSize } = JSON.parse(ctx.request.body)
    console.dir(ctx.request.body)
    console.log(page, pageSize)
    let data = [];
    let res = {}
    try {
      data = await articleService.loadquery(page, pageSize);
      console.log("########",data.length)
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

}
export default new ArticleApi();