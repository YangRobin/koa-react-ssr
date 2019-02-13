import {
  getOptions
} from 'loader-utils';
import {
  renderToString
} from "react-dom/server";
import React from 'react';
import fs from 'fs';
import path from 'path';


export default function rloader(source) {
  const options = getOptions(this);
  console.log("###################", this.resourcePath)

  const filePath = path.join(__dirname, options.inputPath);
  const fileName = path.basename(this.resourcePath.split('.')[0])
  // console.log("#######filename",path.basename(this.resourcePath.split('.')[0]))
  // console.log("###filepath", filePath);
  //判读如果是指定路径的资源则执行下面的脚本生成html

  if (this.resourcePath.indexOf(filePath) > -1) {
    fs.readFile(path.join(__dirname, options.template), function (error, data) {
      if (error) {
        console.log(error)
      } else {
        // console.log("$$$$$$$$$$$$$$",fileName)
        let html = data.toString();
        const B =require('../pages/'+fileName).default;
        // console.log(Home.default)
        const content = renderToString( <B />);
        console.log("3####33333333",content);

        html = html.replace('<div id="root"></div>', `<div id="root">${content}</div><script src="./${fileName+'.js'}"></script>`);
        fs.writeFile(path.join(__dirname, options.outputPath + '/' + fileName + '.html'), html, 'utf8', function (error) {
          if (error) {
            console.log(error);
            return false;
          }
          console.log('写入成功');
        })
      }
    })

    //  return source +" ReactDom.render(<Home />,document.getElementById('root'))"
  }




  return source;
  // const options = getOptions(this);

  // source = source.replace(/\[name\]/g, options.name);

  // return `export default ${ JSON.stringify(source) }`;
}