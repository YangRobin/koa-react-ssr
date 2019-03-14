

import fs from 'fs';
import path from 'path';
// import mysql from 'mysql';
// import config from '../config/app.config'

// const pool = mysql.createPool(config.database)

export function query(sql, values) {
 
}



export function getEntries(dir) {
  var pages = {}
  fs.readdirSync(path.resolve(dir)).forEach(i => {

    if (i !== "admin") {
      pages[i] = dir + "/" + i + "/index.jsx";
    }
  })
  return pages;
}

export function writeFile(file) {
  const tmpdir = path.join(__dirname, "../server/resource/img");
  const filePath = path.join(tmpdir, file.name);
  const reader = fs.createReadStream(file.path);
  const writer = fs.createWriteStream(filePath);
  try {
    reader.pipe(writer);
    return filePath;
  } catch (err) {
    return "file upload error";
  }
}