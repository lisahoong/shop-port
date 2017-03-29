const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/app.jsx'),
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'bundle-app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'client/src'),
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015&presets[]=react'
    }]
  },
  watch: true,
  stats: {
    colors: true
  },
  devtool: 'source-map'
}
