var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');
var autoprefixer = require('autoprefixer');
// var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
      richAnchor: [
        path.resolve(__dirname, './app/richAnchor/main.jsx'),
      ]
  },
  output: {
      path: path.resolve(__dirname, "./app/richAnchor/dist/"),
      publicPath: "/tb/static-ala/richAnchor/",
      filename: "main.js"
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
  plugins: [
    // new HtmlWebpackPlugin({  // Also generate a test.html
    //   filename: 'index.html',
    //   template: path.resolve(__dirname, './app/index.html')
    // }),
    //允许错误不打断程序
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
  ]
};
