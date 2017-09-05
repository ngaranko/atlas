const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const {common, dist, legacy} = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: dist
  }
});
