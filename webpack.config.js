var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var bundlJsFileName = "bundle.js";
module.exports = {
  // entry: {
  //     bundle: [
  //       path.resolve(__dirname, './app/main.jsx'),
  //       // path.resolve(__dirname, './app/component/header.jsx'),
  //     ]
  // },

  // output: {
  //     path: path.resolve(__dirname, "build"),
  //     publicPath: "build/",
  //     filename: bundlJsFileName
  // },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',//资源服务器地址
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './app/main.jsx'),
  ],

  output: {
    publicPath: "http://127.0.0.1:8080/build",
    path: path.resolve(__dirname, 'build'),
    //publicPath: "build/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'react-hot!babel-loader!jsx-loader?harmony'
      }
    ]
  },
  plugins: [
    // commonsPlugin,
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      title: 'Jinya react app',
      template: path.resolve(__dirname, './app/index.html')
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
