import {
  getEntries
} from "../util/util";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import config from "./app.config";
import fs from "fs";
import CleanWebpackPlugin from "clean-webpack-plugin";
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import StaticPathPlugin from '../util/plugins/staticPath'
// const  getEntries =require('../util/util');
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

const conf = {
  entry: {
    ...getEntries(config.pageDir),
    react: ['react', 'redux', 'react-redux', 'moment']
  },
  // target: 'node',
  plugins: [
    new CleanWebpackPlugin(["../src/server/resource"]),
    new ExtractTextPlugin("[name].css"),
    // new VueLoaderPlugin(),
    // new StaticPathPlugin(),
  ],
  resolve: {
    extensions: [".js", ".vue", ".json"]
    // alias: {
    //     'vue': 'vue/dist/vue.common.js',
    //     '@': path.join(__dirname, '..', "./src"),
    // }
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../server/resource")
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all', // 只对入口文件处理
  //     // maxAsyncRequests: 5, // 最大异步请求数， 默认5
  //     // maxInitialRequests: 3, // 最大初始化请求书，默认3
  //     // minSize: 3000,
  //     // cacheGroups: {
  //     //   vendor: {//node_modules内的依赖库
  //     //     chunks: "all",
  //     //     test: /node_modules\//,
  //     //     name: "vendor",
  //     //     minChunks: 2, //被不同entry引用次数(import),1次的话没必要提取
  //     //     // enforce: true?
  //     //   },
  //       // priority: false, // 缓存组优先级
  //       // common: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
  //       //   test: /util\//,
  //       //   // filename: 'common',
  //       //   minChunks: 2,
  //       //   chunks: 'initial',
  //       //   maxAsyncRequests: 5, // 最大异步请求数， 默认1
  //       //   // maxInitialRequests: 3, // 最大初始化请求书，默认1
  //       //   // reuseExistingChunk: true // 可设置是否重用该chunk
  //       // },
  //     }
  //   // },
  //   // runtimeChunk: {
  //   //   name: 'page/manifest'
  //   // }
  // },
  watch: true,
  watchOptions: {
    ignored: "controller/*.js"
  },
  module: {
    rules: [{
      test: /\.less$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: "css-loader", options: {
            modules: true, // 指定启用css modules
            localIdentName: '[name]_[local]_[path]', // 指定css的类名格式,
          }
        }, {
          loader: 'less-loader',

        }]
      })
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({ // 使用ExtractTextWebpackPlugin的extract方法
        fallback: {// 这里表示不提取的时候，使用什么样的配置来处理css
          loader: 'style-loader',
          options: {
            singleton: true // 表示将页面上的所有css都放到一个style标签内
          }
        },
        use: [ // 提取的时候，继续用下面的方式处理
          {
            loader: 'css-loader',

          }
        ]
      })
    },
    // {
    //   test: /\.scss$/,
    //   exclude: /node_modules/,
    //   use: ExtractTextPlugin.extract([{
    //     loader: "style-loader"
    //   }, {
    //     loader: "css-loader",
    //     options: {
    //       modules: true, // 指定启用css modules
    //       localIdentName: '[name]_[local]_[hash:base64:5]' // 指定css的类名格式
    //     }
    //   }, {
    //     loader: 'sass-loader',
    //     options: {
    //       modules: true, // 指定启用css modules
    //       localIdentName: '[name]_[local]_[hash:base64:5]' // 指定css的类名格式
    //     }
    //   }])
    // },

    // {
    //   test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
    //   use: [{
    //       loader: path.resolve(__dirname, '../loaders/jsx2html.js'),
    //       options: {
    //         inputPath: '../pages',
    //         outputPath: '../dist',
    //         template: '../template.html'
    //       }
    //     },
    //     {
    //       loader: path.resolve(__dirname, '../loaders/addRender.js'),
    //       options: {
    //         inputPath: '../pages',
    //         outputPath: '../dist',
    //         template: '../template.html'
    //       }
    //     }
    //   ],

    //   
    // },
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
    // },
    {
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      query: {
        presets: ["es2015"]
      }
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ["es2015", "react", "stage-0"]
      }
    }
    ]
  }
};


/**
 * go through the page folder to generate html-webpack-plugin for webpack config
 * 
 */

fs.readdirSync(config.pageDir).forEach(i => {
  if (i !== "admin") {
    let fileName = i.split('.')[0];
    conf.plugins.push(
      new HtmlWebpackPlugin({
        filename:i.split(".")[0] + ".html",
        title: i,
        template: path.resolve(__dirname, "../server/resource/template/" + fileName + ".html"),
        inject: true,
        chunks: ['react', i]
      })
    );
  }
});

export default conf;