const path = require('path')

module.exports = {
  watch: true,
  entry: './index.js',
  output: {
    filename: './.bin/main.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }]
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    historyApiFallback: true
  }
}
