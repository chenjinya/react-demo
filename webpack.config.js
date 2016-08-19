var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');
var autoprefixer = require('autoprefixer');

var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: [

    //dev hot reload
    'webpack-dev-server/client?http://0.0.0.0:8080',//资源服务器地址
    'webpack/hot/only-dev-server',
    //dev hot reload
    path.resolve(__dirname, './app/main.jsx'),
  ],

  output: {
    publicPath: "http://127.0.0.1:8080/dist/",
    //path: path.resolve(__dirname, './app/dist/'),
    filename: "[name].js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'postcss', 'less']
      }, 
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  postcss: [ autoprefixer({ browsers: ['> 5%'] }) ],
  devServer: {
    hot: true,
    host: "0.0.0.0",
    publicPath: "http://127.0.0.1:8080/dist/",
    contentBase: "app/richAnchor",
    proxy: {
      '/ala/*': {
          target: 'http://haoyunfeng.tieba.otp.baidu.com/',
          secure: false
      }
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    // commonsPlugin,
    // new HtmlWebpackPlugin({  // Also generate a test.html
    //   filename: 'index.html',
    //   title: 'ALa 主播大集合',
    //   template: path.resolve(__dirname, './app/index.html')
    // }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
