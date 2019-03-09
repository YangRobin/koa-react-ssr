#!/usr/bin/env node

/**
 * @author robin.Yang
 */


/*
   @pagePath is the folder that contains the React UIComponent which used
   build html.
   @outputPath is the target folder for building source.

   
  */

require('css-modules-require-hook')
const path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  pagePath = '../src/pages',
  outputPath = '../src/template',
  nodemon = require('nodemon'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')

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
  plugins: [
    new ExtractTextPlugin("style.css")
  ],
  module: {
    rules: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader",
            options: {
              modules: true, // 指定启用css modules
              localIdentName: '[name]_[local]_[hash:base64:5]' // 指定css的类名格式
            }
          }, {
            loader: 'sass-loader'
          }]
        })
      }, {
        test: /\.jsx$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015"]
        }
      },

    ]
  }
}
/**
 * generate html by Scanning the pagePath ,every js file in pagePath will generate a html file .
 */
function prepareHtmlPlugin() {
  fs.readdirSync(path.resolve(__dirname, pagePath)).forEach(i => {
    const fileName = i.split(".")[0];
     
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
       
       
    }
     
  });
}
run();