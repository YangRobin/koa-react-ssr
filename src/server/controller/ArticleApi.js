/**
 * @author robin.yang
 * @description all method in file  named like  **Ctrl.js  will be a middleware for koa-router and retrun 
 * type is json ,in another words ,restful controller.
 */

import userService from '../services/userServiceFacade'
import articleService from '../services/ArticleServiceFacade'
import { underscore2upperCase } from "../../util/util"
import Moment from 'moment';

class ArticleApi {

  /**
   *   request url /queryUserByNameAndPassword
   *   return the user information which type is json
   */
  async queryAllArticle(ctx, next) {
    var res = await articleService.getAllArticle();
    ctx.body = res;
  }
  /**
   * qeury article by page
   */
  async queryArticleByPage(ctx, next) {
    const { page, pageSize } = JSON.parse(ctx.request.body);
    const res = await articleService.queryArticleByPage(page, pageSize)
    const total = await articleService.getTotalArticle();
    ctx.body = {
      success: true,
      result: res,
      total: total[0].total,
    }
  }

  // query article by id 
  async queryArticleById(ctx, next) {
    const { id } = JSON.parse(ctx.request.body);
    let res = await articleService.queryArticleById(id);
    res = underscore2upperCase(JSON.parse(JSON.stringify(res[0])));
    console.log("res", res)
    ctx.body = {
      success: true,
      result: res,
    }
  }

  /**
   * 
   */
  async loadQuery(ctx, next) {
    console.dir(ctx.proxy)
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

  async updateArticle(ctx, next) {
    const article = JSON.parse(ctx.request.body);
    console.log("DDD", article)
    const user = ctx.session.user
    article.discard = 0
    article.creator = user.id;
    const gmtModify = new Date().getTime();
    article.gmtModify = gmtModify;
    article.id = parseInt(article.id);
    article.createTime = new Date(article.createTime).getTime();
    let res = await articleService.updateArticle(article)
    if (res) {
      ctx.body = {
        success: true,
        id: res.insertId,
      }
    }
  }

  async addArticle(ctx, next) {
    const article = JSON.parse(ctx.request.body)
    const user = ctx.session.user;
    const createTime = new Date().getTime();
    article.createTime = createTime;
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