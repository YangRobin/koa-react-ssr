
import path from 'path'
import HtmlWebpackPlugin from "html-webpack-plugin";
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin';

let config = {
  mode: 'production',
  devtool: 'none',
  entry: {
    app: './src/web/pages/admin/index.js',
    vendor: ['vue', 'vue-router', 'moment','iview'],
    editor: ['vue-quill-editor'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../server/resource')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../server/resource'), //服务器内容 publicPath是静态文件内容
    hot: true,//启动热更新
    index: 'admin.html',
    proxy: {

      // "/upload": "http://localhost:3000",
      "/api": {
        target: "http://localhost:3000",

      }
    }
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', 'scss'],
    alias: {
      'vue': 'vue/dist/vue.common.js',
      // '@': path.join(__dirname, '..', "./src"),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: "src/web/pages/admin/admin.html",
      // chunks: ['app']
    }),
    new VueLoaderPlugin(),
    new ExtractTextPlugin("[name].css"),
    new webpack.HashedModuleIdsPlugin({}),

  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000,
      cacheGroups: {
        vendor: {//node_modules内的依赖库
          chunks: "all",
          test: /node_modules\//,
          name: "vendor",
          minChunks: 2, //被不同entry引用次数(import),1次的话没必要提取
          // enforce: true?
        },
      }
      // minChunks: 1,

      // cacheGroups: {
      //   main: {//node_modules内的依赖库
      //     chunks: "all",
      //     name: "main",
      //     minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
      //     // enforce: true?
      //   }
      // }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [
                'css-loader',
                'sass-loader',
              ],
              fallback: 'vue-style-loader'
            })
          }
        }
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
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
          ]
        })
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'imgs/[name]_[hash:7].[ext]'
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.scss$/,
      //   loader: ['css-loader', 'style-loader', 'sass-loader'],
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     use: ['css-loader', 'sass-loader'],
      //     fallback: 'style-loader'
      //   }),
      //   exclude: '/node_modules/'
      // },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [{
      //       loader: 'style-loader'
      //     }, {
      //       loader: 'css-loader'
      //     }],
      //     fallback: 'style-loader',
      //   }),
      //   exclude: '/node_modules/'
      //   // use: ['style-loader', 'css-loader'],
      // },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      // }
    ]
  },

}

export default config 