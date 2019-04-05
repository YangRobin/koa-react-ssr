/**
 * @author robin.yang
 */

import Query from '../../util/Query';
const query = Query.query;

class ArticleServiceFacade {

  /**
   * search Article by title ,keyword ,createTime
   */
  getArticle(param) {
    let sql = 'select * from article'
    try {
      if (param.title) {
        sql = sql + ` where title = '${param.title}'`;
        console.log(sql)
      }
      if (param.keyword) {
        sql = sql + ` where content like '%${param.keyword}%'`
      }
      if (param.gmtCreate) {
        sql = sql + ` where create_time = '${param.gmtCreate}'`
      }
      // sql = sql + ` limit ${param.pageSize} offset ${param.pageSize * (param.page - 1)}`
    } catch (e) {
      throw new Error(e);
    }
    return query(sql)
  }

  /**
   * get all Article 
   */
  getAllArticle() {
    return query("select * from article");
  }
  getTotalArticle() {
    return query('SELECT  count(*) as total from article')
  }
  /**
   * @param {*} page 
   * @param {*} pageSize
   * @description query article by page 
   */
  async queryArticleByPage(page, pageSize) {
    let sql = `SELECT * FROM article  ORDER BY create_time DESC  LIMIT ${pageSize} OFFSET ${pageSize * (page - 1)} `
    return await query(sql)
  }

  /**
   * 
   * @param {} article 
   * @description add article
   */
  addArticle(article) {
    let sql = `
      INSERT INTO
      article(id, title, type, media_type, sub_type, creator, content, create_time, cover, gmt_modify, discard)
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

  queryArticleById(id) {
    const sql = `
      SELECT * FROM article where id = ${ id}
      `
    return query(sql);
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
      title = '${article.title}',
        type = '${article.type}',
        media_type = '${article.mediaType}',
        sub_type = '${article.subType}',
        creator = '${article.creator}',
        content = '${article.content}',
        create_time = '${article.createTime}',
        cover = '${article.cover}',
        gmt_modify = '${article.gmtModify}',
        discard = ${ article.discard}
      WHERE
      id = ${ article.id}
      `

    console.log("sql", sql)
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
      discard = 1
      WHERE
      id = ${ id}
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
      ${ pageSize}
      OFFSET
      ${ (page - 1) * (pageSize)}
      `
    const test = await query(sql);

    //巨坑 无比
    return await query(sql)
  }
}
export default new ArticleServiceFacade();