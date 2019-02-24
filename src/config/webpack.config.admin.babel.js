
import path from 'path'
import HtmlWebpackPlugin from "html-webpack-plugin";
import VueLoaderPlugin from 'vue-loader/lib/plugin'

let config = {
  entry: {
    app: './src/web/pages/admin/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../server/resource')
  },
  devServer: {
    // contentBase: '../web/pages/admin/src', //服务器内容 publicPath是静态文件内容
    hot: true //启动热更新
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.common.js',
      // '@': path.join(__dirname, '..', "./src"),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: "src/web/pages/admin/admin.html",
      chunks: ['app']
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        loader: ['css-loader', 'style-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  }
}

export default config 