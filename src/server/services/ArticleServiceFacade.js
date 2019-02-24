/**
 * @author robin.yang
 */

import {
  query
} from '../../util/util';

class ArticleServiceFacade {
  /**
   * get all Article 
   */
  getAllArticle() {
    return query("select * from article");
  }

  /**
   * 
   * @param {*} page 
   * @param {*} pageSize
   * @description query article by page 
   */
  getArticleByPage(page, pageSize) {
    return query(`SELECT * FROM article  LIMIT ${pageSize} OFFSET ${pageSize * page}`)
  }
}
export default new ArticleServiceFacade();