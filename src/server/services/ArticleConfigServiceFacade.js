/**
 * @author robin.yang
 */

import Query from '../../util/Query';
const query = Query.query;


export function queryArticleConfigList() {
  const sql = `
      SELECT * FROM t_article_config
    `
  return query(sql)
}

//置顶文章
export function updateArticleConfigById(id,articleId){
  console.log(id,articleId)
  const sql =`
    UPDATE t_article_config SET article_id='${articleId}' where id ='${id}'
  `
  return query(sql);
}

