

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
  console.log("###################", this.resourcePath)
 
  const filePath = path.join(__dirname, options.inputPath);
  const fileName = path.basename(this.resourcePath.split('.')[0])
  // console.log("#######filename",path.basename(this.resourcePath.split('.')[0]))
  // console.log("###filepath", filePath);
  //判读如果是指定路径的资源则执行下面的脚本生成html
  let ht=''
  if (this.resourcePath.indexOf(filePath) > -1) {
    fs.readFile(this.resourcePath, function (error, data) {
      if (error) {
        console.log(error)
      } else {
        console.log("$$$$$$$$$$$$$$$$$$",source)
   
        let html = data.toString();
        
        ht= html+ "console.log('this is addrender tset')";
      }
    })

  }

  return source;
  
}