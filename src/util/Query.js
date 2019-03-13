
import mysql from 'mysql';
import config from '../config/app.config'
import { resolve } from 'uri-js';
const pool = mysql.createPool(config.database);

class Query {
  constructor(database) {
    this.database = database;
  }
  getPool() {
    if (!Query.pool) {
      Query.pool = mysql.createPool(config.database);
      return Query.pool;
    } else {
      return Query.pool;
    }
  }
  getInstance() {
    if (!Query.instance) {
      return new Query(config.database);
    }
    return Query.instance;
  }
  static query(sql, values) {
    console.log(this)
    return new Promise((resolve, reject) => {
      const pool = new Query().getPool()
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            // connection.release()//
            pool.releaseConnection(connection);
          })
        }
      })
    }).catch(err => {
      console.log("获取数据库连接错误!", err);
    })
  }

}
export default Query;