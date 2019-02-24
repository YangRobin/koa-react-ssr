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

}
export default  new ArticleServiceFacade();