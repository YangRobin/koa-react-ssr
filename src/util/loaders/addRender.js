

import {
  getOptions
} from 'loader-utils';
import {
  renderToString
} from "react-dom/server";
import React from 'react';
import fs from 'fs';
import path from 'path';


export default function addrender(source) {
  const options = getOptions(this);
   
 
  const filePath = path.join(__dirname, options.inputPath);
  const fileName = path.basename(this.resourcePath.split('.')[0])
  //  
  //  ;
  //判读如果是指定路径的资源则执行下面的脚本生成html
  let ht=''
  if (this.resourcePath.indexOf(filePath) > -1) {
    fs.readFile(this.resourcePath, function (error, data) {
      if (error) {
         
      } else {
         
   
        let html = data.toString();
        
        ht= html+ " ";
      }
    })

  }

  return source;
  
}