const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {common, dist, legacy} = require('./webpack.common.js');
const nodeEnv = 'development';

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: dist
  },
  plugins: [
    new webpack.DefinePlugin({
      '__BUILD_ID__': JSON.stringify(nodeEnv),
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    }),
    new ExtractTextPlugin('main.css')
  ]
});
