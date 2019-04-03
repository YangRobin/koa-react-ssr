

import { queryArticleConfigList } from '../services/ArticleConfigServiceFacade';
import { underscore2upperCase } from "../../util/util";
import ArticleServiceFacade from '../services/ArticleServiceFacade'

export async function queryConfigList(ctx, next) {
  let result;
  try {
    result = await queryArticleConfigList();
    let len = result.length;
    // while(len--)
    for (let i = 0; i < len; i++) {
      let article = await ArticleServiceFacade.queryArticleById(result[i].article_id);
      result[i].article=article;
    }
    // result.forEach(e => {
    //   let article = await ArticleServiceFacade.queryArticleById(e.id);
    //   e.article = article;
    // });
    console.log(result)
    ctx.body = {
      success: true,
      result,
    }
  } catch (err) {
    ctx.body = {
      success: false,
      result: err,
    }
  }
}