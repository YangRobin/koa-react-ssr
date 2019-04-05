

import {
  queryArticleConfigList,
  updateArticleConfigById
} from '../services/ArticleConfigServiceFacade';
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
      result[i].article = article;
    }
    // result.forEach(e => {
    //   let article = await ArticleServiceFacade.queryArticleById(e.id);
    //   e.article = article;
    // });
      
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

export async function updateConfig(ctx, next) {
  const { id, articleId } = JSON.parse(ctx.request.body);
  let result,success;
  try {
    result = await updateArticleConfigById(id, articleId);
    success = true;
  } catch (err) {
    result = err;
    success = false;
  }
  ctx.body = {
    result,
    success
  }
}