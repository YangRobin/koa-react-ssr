import nodemon from 'nodemon';
#!/usr/bin/env node

/**
 * @author robin.Yang
 */


/*
   @pagePath is the folder that contains the React UIComponent which used
   build html.
   @outputPath is the target folder for building source.
  */
const path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  pagePath = '../src/pages',
  outputPath = '../src/dist',
  nodemon =require('nodemon');

/*
  Scanning the given folder and build entry for webpack ,return a plain-object. 
  @dir is the folder which contains the React UIcomponet
*/
const getEntries = function (dir) {
  var pages = {}
  fs.readdirSync(dir).forEach(i => {
    pages[i.split('.')[0]] = path.resolve(dir + '/' + i)
  })
  return pages;
}


/**
 * webpack config
 */
const config = {
  entry: getEntries(path.resolve(__dirname, pagePath)),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, outputPath)
  },
  plugins: [],
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      query: {
        presets: ["es2015"]
      }
    }, ]
  }
}
/**
 * generate html by Scanning the pagePath ,every js file in pagePath will generate a html file .
 */
function prepareHtmlPlugin() {
  fs.readdirSync(path.resolve(__dirname, pagePath)).forEach(i => {
    const fileName = i.split(".")[0];
    console.log(i)
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: fileName + ".html",
        title: fileName,
        template: path.resolve(__dirname, "../src/template.html"),
        inject: "body",
        chunks: [fileName]
      })
    );
  });
}

function run() {
  prepareHtmlPlugin();
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err)
    }
    console.log('generate html succuessfully!')
  });
}
run();