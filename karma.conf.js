const path = require('path');
const webpack = require('webpack');
const { root, dist, src, legacy } = require('./webpack.common.js');
const nodeEnv = 'development';

const webpackConfig = {
  context: root,
  output: {
    filename: 'test.bundle.js',
    path: dist
  },
  resolve: {
    modules: [
      './node_modules',
      './bower_components'
    ]
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        include: [
          legacy
        ],
        use: 'html-loader'
      },
      {
        test: /\.(run\.js|scss|png|svg|cur)$/,
        include: [
          src,
          legacy
        ],
        use: [{
          loader: 'file-loader',
          options: {
            emitFile: false
          }
        }]
      },
      {
        test: /\.jsx?$/,
        include: [
          src,
          legacy,
          /atlas\.run\.js$/
        ],
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__BUILD_ID__': JSON.stringify(nodeEnv),
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    })
  ]
};

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine-jquery', 'jasmine'],
        files: [
            { pattern: './node_modules/leaflet/dist/leaflet.js', watched: false },
            { pattern: './node_modules/leaflet.nontiledlayer/dist/NonTiledLayer.js', watched: false },
            { pattern: './node_modules/proj4/dist/proj4.js', watched: false },
            { pattern: './node_modules/proj4leaflet/src/proj4leaflet.js', watched: false },
            { pattern: 'src/test-index.js', watched: false }
        ],
        plugins: [
            'karma-webpack',
            'karma-jasmine-jquery',
            'karma-jasmine',
            'karma-mocha-reporter',
            'karma-coverage-istanbul-reporter',
            'karma-phantomjs-launcher',
            'karma-sourcemap-loader'
        ],
        // possible values: OFF, ERROR, WARN, INFO, DEBUG
        logLevel: 'ERROR',
        reporters: ['progress', 'mocha', 'coverage-istanbul'],
        preprocessors: {
            'src/test-index.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        mochaReporter: {
            output: 'minimal'
        },
        coverageIstanbulReporter: {
            reports: ['html'],
            dir: path.join(__dirname, 'coverage')
        },
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
