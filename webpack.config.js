var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './index.js',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/',
	  path: path.join(__dirname, 'output'),
	  filename: 'index'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, '/'),
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      },
      { 
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      },
    ]
  },
  devServer: {
    contentBase: "./",
	outputPath: path.join(__dirname, 'output')
  },
};