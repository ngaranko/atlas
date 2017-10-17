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
    var jsFiles = ['build/temp/atlas.libs.js'];
    jsFiles = jsFiles.concat(require('./grunt/config/js-files').jsFiles);
    jsFiles.push('bower_components/angular-mocks/angular-mocks.js');
    jsFiles.push('build/temp/babel/es5tests/*.js');

    config.set({
        frameworks: ['jasmine-jquery', 'jasmine'],
        files: [
            { pattern: 'dist/leaflet.js', watched: false },
            { pattern: 'dist/NonTiledLayer.js', watched: false },
            { pattern: 'dist/proj4.js', watched: false },
            { pattern: 'dist/proj4leaflet.js', watched: false },
            { pattern: 'src/test-index.js', watched: false }
        ],
        //exclude: ['modules/**/*.run.js'],
        plugins: [
            'karma-webpack',
            'karma-jasmine-jquery',
            'karma-jasmine',
            //'karma-mocha-reporter',
            //'karma-coverage',
            'karma-phantomjs-launcher',
            //'karma-babel-preprocessor',
            'karma-sourcemap-loader'
        ],
        // possible values: OFF, ERROR, WARN, INFO, DEBUG
        logLevel: 'ERROR',
        preprocessors: {
            'src/test-index.js': ['webpack', 'sourcemap'],
            //'modules/**/!(*.test).js': ['babel'],
            //'build/temp/babel/es5tests/*.js': ['sourcemap']
        },
        webpack: webpackConfig,
        mochaReporter: {
            output: 'minimal'
        },
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
