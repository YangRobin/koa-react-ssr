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
    ctx.body = res;
  }
  /**
   * qeury article by page
   */
  async queryArticleByPage(ctx, next) {
    const { page, pageSize } = ctx.request.query;
    ctx.query = await articleService.queryArticleByPage(page, pageSize)
  }

}
export default new ArticleApi();