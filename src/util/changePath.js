import path from 'path'
import fs from 'fs'

const staticPath = path.resolve(__dirname, '../server/resource');
export function changStaticPathInHtml() {
  let fileNames = fs.readdirSync(staticPath)
  fileNames.forEach(i => {
    if (/\.html$/.test(i)) {
      var html = fs.readFileSync(path.resolve(__dirname, '../server/resource') + "/" + i).toString();
      html =html.replace(/href="\/*/img,"href=\"/");
      html=html.replace(/src="\/*/img,"src=\"/")
      fs.writeFile(path.resolve(__dirname, '../server/resource') + "/" + i, html, 'utf-8', (err) => {
        if (err) {
          console.warn(err)
        }
      })
    }
  })
}