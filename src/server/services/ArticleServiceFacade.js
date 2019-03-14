/**
 * @author robin.yang
 */

import Query from '../../util/Query';
const query = Query.query;

class ArticleServiceFacade {
  /**
   * get all Article 
   */
  getAllArticle() {
    return query("select * from article");
  }

  /**
   * @param {*} page 
   * @param {*} pageSize
   * @description query article by page 
   */
  async queryArticleByPage(page, pageSize) {
    return await query(`SELECT * FROM article  LIMIT ${pageSize} OFFSET ${pageSize * (page - 1)}`)
  }

  /**
   * 
   * @param {} article 
   * @description add article
   */
  addArticle(article) {
    let sql = `
    INSERT INTO
      article (id,title,type,media_type,sub_type,creator,content,create_time,cover,gmt_modify,discard) 
    VALUES 
      (0,
      '${article.title}',
      '${article.type}',
      '${article.mediaType}',
      '${article.subType}',
      '${article.creator}',
      '${article.content}',
      '${article.createTime}',
      '${article.cover}',
      '${article.gmtModify}',
      '${article.discard}'
      )
    `
    return query(sql)
  }

  /**
   * @param {*} article
   * @description update article by id 
   */
  updateArticle(article) {
    let sql = `
    UPDATE 
      article 
    SET
      title='${article.title}',
      type='${article.type}',
      creator='${article.creator}',
      content='${article.content}', 
      crerate_time='${article.createTime}',
      cover='${article.cover}',
      gmt_midify='${article.gmtModify}'
      discard='${article.discard}'
    WHERE 
      id = ${article.id}
    `
    return query(sql)
  }

  /**
   * @param {article ID} id 
   * publish article by Id
   */
  publishArticle(id) {
    let sql = `
      UPDATE 
        article
      SET
        discard=1
      WHERE
        id=${id}
    `
    return query(sql);
  }

  async loadquery(page, pageSize) {
    let sql = `
      SELECT 
        *  
      FROM 
        article 
      LIMIT
        ${pageSize}
      OFFSET
        ${(page - 1) * (pageSize)}
    `
    const test =await query(sql);
      
    //巨坑 无比
    return await query(sql)
  }
}
export default new ArticleServiceFacade();