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