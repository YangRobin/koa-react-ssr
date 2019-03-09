#!/usr/bin/env babel-node

/**
 * @author robin.yang
 */


require('css-modules-require-hook')({
  extensions: ['.scss'],
  preprocessCss: (data, filename) =>
    require('node-sass').renderSync({
      data,
      file: filename
    }).css,
  // camelCase: true,
  // generateScopedName: '[name]_[local]_[hash:base64:5]',
  generateScopedName: '[name]_[local]_[path]',
})

 

import React from 'react';
import {
  renderToString
} from 'react-dom/server';
import fs from 'fs';
import path from 'path';


// page folder 
const pageFolder = '../src/web/pages/';
const targetTemplatePath = '../src/server/resource/template/';
// const pageFolder =process.argv.slice()[0]

// html template 
let template = '<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <meta http-equiv="X-UA-Compatible" content="ie=edge">  <title>Document</title></head><body><div id="root"></div></body></html>'
// let template = '.src/template.html';


function run(pagePath) {
  //get the jsx file in given folder 
  // const fileNames = fs.readdirSync(pagePath).filter((i) => {
  //   return i.match(/\.jsx$/);
  // })
  let fileNames = fs.readdirSync(pagePath)
  // filter admin page
  fileNames = fileNames.filter(i => {
    return i !== "admin"
  })
  // generate html by rendering React component in given folder 
  fileNames.forEach((name, index) => {
    const B = require(pageFolder + name).default,
      content = renderToString(< B />);
    const html = template.replace('<div id="root"></div>', `<div id="root">${content}</div>`);

    fs.writeFile(path.join(__dirname, targetTemplatePath + name.split('.')[0] + '.html'), html, 'utf-8', (err) => {
      if (err) {
        console.warn(err)
      }
    })
  })
}
run(path.resolve(__dirname, pageFolder))