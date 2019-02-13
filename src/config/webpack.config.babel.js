import { getEntries } from "../util/util";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import config from "./app.config";
import fs from "fs";
import CleanWebpackPlugin from "clean-webpack-plugin";

import BasicPlugin from "../plugins/test";

// const  getEntries =require('../util/util');
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

const conf = {
  entry: getEntries(config.pageDir),
  plugins: [
    new CleanWebpackPlugin(["../dist"]),
    new BasicPlugin({
      options: true
    })
    // new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: [".js", ".vue", ".json"]
    // alias: {
    //     'vue': 'vue/dist/vue.common.js',
    //     '@': path.join(__dirname, '..', "./src"),
    // }
  },
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "../dist")
  },

  // devServer: {
  //   contentBase: path.join(__dirname, "../dist"),
  //   hot: true ,//启动热更新,
  // },
  // watch: true,
  watchOptions: {
    ignored: "controller/*.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
        use: [
          {
            loader: path.resolve(__dirname,'../loaders/jsx2html.js'),
            options: {
              inputPath:'../pages',
              outputPath:'../dist',
              template:'../template.html'
            }
          },
          {
            loader: path.resolve(__dirname,'../loaders/addRender.js'),
            options: {
              inputPath:'../pages',
              outputPath:'../dist',
              template:'../template.html'
            }
          }
        ],
        
       //使用的加载器名称
      },
      // {
      //   test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
      //   use: [
      //     {
      //       loader: path.resolve(__dirname,'../loaders/test.js'),
      //       options: {
      //         inputPath:'../pages',
      //         outputPath:'../dist',
      //         template:'../template.html'
      //       }
      //     }
      //   ],
        
      //  //使用的加载器名称
      // },
      {
        test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
        loader: "babel-loader", //使用的加载器名称
        query: {
          //babel的配置参数，可以写在.babelrc文件里也可以写在这里
          presets: ["es2015"]
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  }
};

// fs.readdirSync(config.pageDir).forEach(i => {
//   conf.plugins.push(
//     new HtmlWebpackPlugin({
//       filename: i.split(".")[0] + ".html",
//       title: i,
//       template: "./src/template.html",
//       inject: function() {
//         console.log("this is robin");
//       },
//       chunks: [i] //加载指定的js文件，没有指定该选项，则加载所有js文件
//     })
//   );
// });

export default conf;
