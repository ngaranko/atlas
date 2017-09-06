const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {common} = require('./webpack.common.js');

module.exports = function(env) {
  const buildId = env && env.buildId ? env.buildId : 'production';

  return merge(common, {
    output: {
      filename: '[name].[chunkhash].js',
    },
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
      }),
      new webpack.DefinePlugin({
        '__BUILD_ID__': JSON.stringify(buildId),
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new UglifyJSPlugin({
        // Do not minify our legacy code (app.bundle.js); this doesn't work with
        // angular dependancy injection
        exclude: /app/,
        sourceMap: true
      }),
      new ExtractTextPlugin('main.[contenthash].css')
    ]
  });
};
