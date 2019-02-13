

import fs  from 'fs';
import path from 'path';
import mysql from 'mysql';
import config from '../config/app.config'

const pool = mysql.createPool(config.database)

export function query ( sql, values ) {
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
    .catch((error) => {
        console.log(error,'Promise error');
    });
}



export function getEntries(dir){
  path.resolve('./src/pages')
  var pages={}
  fs.readdirSync(dir).forEach(i=>{
    console.log(i)
    pages[i]='./src/pages/'+i
  })
  return pages;
}


// export const  winProxy = (function(){
//   if (typeof window ===  "undefined"){
//     return null;
//   }
//   return window;
// })()