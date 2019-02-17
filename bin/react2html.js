#!/usr/bin/env babel-node
import React from 'react';
import {
  renderToString
} from 'react-dom/server';
import fs from 'fs';
import path from 'path';

let template = '<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <meta http-equiv="X-UA-Compatible" content="ie=edge">  <title>Document</title></head><body><div id="root"></div></body></html>'

function run(pagePath) {
  const fileNames = fs.readdirSync(pagePath).filter((i)=>{
    return i.match(/\.jsx$/);
  })
  fileNames.forEach((name, index) => {
    const B = require('../src/pages/' + name).default;
    const content = renderToString( <B /> );
    const html = template.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
    fs.writeFile(path.join(__dirname, '../src/template/' + name.split('.')[0] + '.html'), html, 'utf-8', (err) => {
      if (err) {
        console.warn(err)
      }
    })
  })
}
run(path.resolve(__dirname, '../src/pages'))
