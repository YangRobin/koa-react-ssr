import {
  getEntries
} from "../util/util";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import config from "./app.config";
import fs from "fs";
import CleanWebpackPlugin from "clean-webpack-plugin";
import webpack from 'webpack'
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
    }),

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
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist")
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all', // 只对入口文件处理
  //     maxAsyncRequests: 5, // 最大异步请求数， 默认5
  //     maxInitialRequests : 3, // 最大初始化请求书，默认3
  //     cacheGroups: {
  //       // priority: -1, // 缓存组优先级
  //       vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
  //         test: /node_modules\//,
  //         // maxAsyncRequests: 5, // 最大异步请求数， 默认1
  //         // maxInitialRequests : 3, // 最大初始化请求书，默认1
  //         reuseExistingChunk: true // 可设置是否重用该chunk
  //       },
  //     }
  //   },
  //   runtimeChunk: {
  //     name: 'page/manifest'
  //   }
  // },
  // devServer: {
  //   contentBase: path.join(__dirname, "../dist"),
  //   hot: true ,//启动热更新,
  // },
  watch: true,
  watchOptions: {
    ignored: "controller/*.js"
  },
  module: {
    rules: [
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

      //   //使用的加载器名称
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

fs.readdirSync(config.pageDir).forEach(i => {

  if (i.match(/\.jsx$/) !== null) {
    let fileName = i.split('.')[0];
    console.log(fileName)
    conf.plugins.push(
      new HtmlWebpackPlugin({
        filename: i.split(".")[0] + ".html",
        title: i,
        template: path.resolve(__dirname, "../template/" + fileName + ".html"),
        inject: true,
        chunks: [i] //加载指定的js文件，没有指定该选项，则加载所有js文件
      })
    );
  }
});

export default conf;