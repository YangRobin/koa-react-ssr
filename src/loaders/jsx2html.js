import {
  getOptions
} from 'loader-utils';
import {
  renderToString
} from "react-dom/server";
import React from 'react';
import fs from 'fs';
import path from 'path';


export default function jsx2html(source) {

  const options = getOptions(this),
    filePath = path.join(__dirname, options.inputPath),
    fileName = path.basename(this.resourcePath.split('.')[0])


  /**
   * if the resource is in certain path 
   */
  if (this.resourcePath.indexOf(filePath) > -1) {
    fs.readFile(path.join(__dirname, options.template), function (error, data) {
      if (error) {
        console.log(error)
      } else {

        let html = data.toString();
        const B = require('../pages/' + fileName).default,
          content = renderToString( < B / > );
          
        html = html.replace('<div id="root"></div>', `<div id="root">${content}</div><script src="./${fileName+'.js'}"></script>`);
        fs.writeFile(path.join(__dirname, options.outputPath + '/' + fileName + '.html'), html, 'utf8', function (error) {
          if (error) {
            console.log(error);
            return false;
          }
          console.log('write html succecesfully !');
        })
      }
    })
  }
  return source;
}