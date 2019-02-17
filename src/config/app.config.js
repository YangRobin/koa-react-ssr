import path from 'path';

const config = {
  //监听端口
  port: 3000,
  pageDir: path.resolve('./src/pages'),
  database: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'xyzy',
  }
}



export default config;