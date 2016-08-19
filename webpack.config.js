var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');
var autoprefixer = require('autoprefixer');

<<<<<<< HEAD
module.exports = {
  entry: {
    main: [
      //dev hot reload
      'webpack-dev-server/client?http://0.0.0.0:8080',//资源服务器地址
      'webpack/hot/only-dev-server',
      //dev hot reload
      path.resolve(__dirname, './app/richAnchor/main.jsx'),
    ]
  },
=======
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: [

    //dev hot reload
    'webpack-dev-server/client?http://0.0.0.0:8080',//资源服务器地址
    'webpack/hot/only-dev-server',
    //dev hot reload
    path.resolve(__dirname, './app/main.jsx'),
  ],
>>>>>>> c23892bd314d1b607cc9c5ef5ebca893e7f2238b

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
<<<<<<< HEAD
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'postcss', 'less']
      }, 
      {
        test: /\.css$/,
        loaders: ['style', 'css']
=======
        loader: 'react-hot!babel-loader!jsx-loader?harmony'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      }, // use ! to chain loaders
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
>>>>>>> c23892bd314d1b607cc9c5ef5ebca893e7f2238b
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
<<<<<<< HEAD
  postcss: [ autoprefixer({ browsers: ['> 5%'] }) ],
  devServer: {
    hot: true,
    host: "0.0.0.0",
    publicPath: "http://127.0.0.1:8080/dist/",
    contentBase: "app/richAnchor",
    proxy: {
      '/ala/*': {
          target: 'http://haoyunfeng.tieba.otp.baidu.com/',
=======
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  devServer: {
    hot: true,
    publicPath: "http://127.0.0.1:8080/dist/",
    contentBase: "app/",
    proxy: {
      '/ala/*': {
          target: 'http://haoyunfeng.service.tieba.otp.baidu.com:8080',
>>>>>>> c23892bd314d1b607cc9c5ef5ebca893e7f2238b
          secure: false
      }
    }
  },

  plugins: [
<<<<<<< HEAD
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
=======
    // commonsPlugin,
    // new HtmlWebpackPlugin({  // Also generate a test.html
    //   filename: 'index.html',
    //   title: 'ALa 主播大集合',
    //   template: path.resolve(__dirname, './app/index.html')
    // }),
>>>>>>> c23892bd314d1b607cc9c5ef5ebca893e7f2238b
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
