import path from 'path';

/**
 * global config for app
 */

const config = {
  //app port 
  port: 3000,
  /**
   * react UIcomponent which will used for rendering html 
   */
  pageDir: './src/web/pages',
  /**
   * datasource 
   */
  database: {
    host: '127.0.0.1',
    // host: '39.98.57.178',
    user: 'root',
    password: 'root',
    database: 'st',
  }
}



export default config;