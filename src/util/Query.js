
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
  async getConnection() {
    const pool = new Query().getPool();
    if (!Query.conn) {
      Query.conn = await new Promise((resolve, reject) => {
        const pool = new Query().getPool()
        pool.getConnection(function (err, connection) {
          if (err) {
              
            reject(err)
          } else {
            resolve(connection)
          }
        })
      })
      return Query.conn;
    } else {
      return Query.conn;
    }

  }

  static query(sql, values) {
    return new Promise((resolve, reject) => {
      new Query().getPool().getConnection(function (err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            connection.release();
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          })
        }
      })
    })
  }
}
export default Query;