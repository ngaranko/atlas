const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const devConfig = require('./webpack.dev.js');

module.exports = function(env) {
  const nodeEnv = env && env.nodeEnv ? env.nodeEnv : 'production';
  const buildId = env && env.buildId ? env.buildId : nodeEnv;

  return devConfig({ nodeEnv, buildId });
};
