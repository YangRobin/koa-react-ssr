#!/usr/bin/env babel-node 


import React from 'react';
import { renderToString} from 'react-dom/server';

import commander from 'commander';
import fs from 'fs';
import path from 'path';

const template= `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
</body>
</html>`

function run(pagePath) {
  console.log(pagePath)
  var fileNames = fs.readdirSync(pagePath);
  console.log(__dirname)
  fileNames.forEach((name,index)=>{
    const B =require('../src/pages/'+name).default;
    console.log(B)
    const html = renderToString(< B />)
    template.replace('<div id="root"></div>',html.toString())
    fs.writeFile(path.join(__dirname,'../src/dist/'+name.split('.')[0]+'.html'),template,'utf-8',(err)=>{
      console.log(err)
    })
    console.log(name,index);
  })

  // console.log("######",pa)
  // fs.readdir(path, (error, file) => {
  //   if (error) {
  //     throw error;
  //   } else {
  //     console.log(file)
  //   }
  // })

  // fs.readFile(path.join(__dirname, path), function (error, data) {
  //   if (error) {
  //     console.log(error);
  //     return ;
  //   } else {

  //     let html = data.toString();
  //     const B = require('../pages/' + fileName).default;
  //     // console.log(Home.default)
  //     const content = renderToString( < B / > );
  //     console.log("3####33333333", content);

  //     html = html.replace('<div id="root"></div>', `<div id="root">${content}</div><script src="./${fileName+'.js'}"></script>`);
  //     fs.writeFile(path.join(__dirname, options.outputPath + '/' + fileName + '.html'), html, 'utf8', function (error) {
  //       if (error) {
  //         console.log(error);
  //         return false;
  //       }
  //       console.log('写入成功');
  //     })
  //   }
  // })

}

commander
  .option('-p', 'page')
  .action(() => {
    run(path.resolve(__dirname,'../src/pages'))
  })


commander
  .option('--b', 'watch')
  .action(() => {
    console.log("b")
  })


commander.parse(process.argv)
// const run = function (args){
//   console.log(args)
// }

// run(process.argv)

// console.log(process.argv)
// console.log(process.arch)
// console.log(process.env)