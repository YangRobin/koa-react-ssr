

import fs  from 'fs';
import path from 'path';


export function getEntries(dir){
  path.resolve('./src/pages')
  var pages={}
  fs.readdirSync(dir).forEach(i=>{
    console.log(i)
    pages[i]='./src/pages/'+i
  })
  return pages;
}


// export const  winProxy = (function(){
//   if (typeof window ===  "undefined"){
//     return null;
//   }
//   return window;
// })()