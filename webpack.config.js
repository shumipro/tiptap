var webpack = require('webpack');

module.exports = {
  cache: true,

  watch: true,

  entry: {
    'main': ['./public/js/app.js']
  },

  output: {
    filename: '[name].js'
  },

  node: {
    fs: "empty"
  },

  devtool: 'inline-source-map',

  module: {
    loaders: [
      { test: /\.js$|\.jsx$/, exclude: /node_modules|build/, loader: 'babel-loader'}
    ]
  },

  plugins: [],

  resolve: {
    root: __dirname,
    alias: {
    },
    extensions: ['', '.js', '.jsx']
  }
};
