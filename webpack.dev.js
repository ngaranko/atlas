const merge = require('webpack-merge');
const {common, dist} = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: dist
  }
});
