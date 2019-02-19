#!/usr/bin/env babel-node

/**
 * @author robin.yang
 */

 
require('css-modules-require-hook')

 
import React from 'react';
import {
  renderToString
} from 'react-dom/server';
import fs from 'fs';
import path from 'path';


// page folder 
const pageFolder='../src/pages/';
// const pageFolder =process.argv.slice()[0]

// html template 
let template = '<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <meta http-equiv="X-UA-Compatible" content="ie=edge">  <title>Document</title></head><body><div id="root"></div></body></html>'
// let template = '.src/template.html';


function run(pagePath) {
  //get the jsx file in given folder 
  const fileNames = fs.readdirSync(pagePath).filter((i) => {
    return i.match(/\.jsx$/);
  })

  // generate html by rendering React component in given folder 
  fileNames.forEach((name, index) => {
    const B = require(pageFolder + name).default,
      content = renderToString( < B / > ),
      html = template.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
      console.log(html)
    fs.writeFile(path.join(__dirname, '../src/template/' + name.split('.')[0] + '.html'), html, 'utf-8', (err) => {
      if (err) {
        console.warn(err)
      }
    })
  })
}
run(path.resolve(__dirname, '../src/pages'))