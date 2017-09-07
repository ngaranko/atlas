// eslint-disable
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const root = path.resolve(__dirname);
const src = path.resolve(root, 'src');
const legacy = path.resolve(root, 'modules');
const dist = path.resolve(root, 'dist');

function isExternal(module) {
  const context = module.context;
  if (typeof context !== 'string') {
    return false;
  }
  return context.indexOf('node_modules') !== -1 || context.indexOf('bower_components') !== -1;
}

const common = {
  context: root,
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: dist
  },
  resolve: {
    modules: [
      './node_modules',
      './bower_components',
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          src,
          legacy
        ],
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        include: [
          src,
          legacy
        ],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false, // Disable URL parsing in css for now
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.html$/,
        include: [
          legacy
        ],
        use: 'html-loader',
      },
      {
        test: /\.(png|svg|cur)$/,
        include: [
          legacy
        ],
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/'
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([dist]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => isExternal(module) // see https://stackoverflow.com/a/38733864
    }),
    new CopyWebpackPlugin([
      // Simply copy the leaflet styling for now
      { from: './node_modules/leaflet/dist/leaflet.css' },
      { from: './node_modules/leaflet-draw/dist/leaflet.draw.css' },
      { from: './bower_components/bbga_visualisatie_d3/bbga.css' },

      // proj4 is giving troubles when included by webpack, resulting in syntax
      // errors. For now it is dumbly being copied to the output directory.
      // This means also proj4leaflet is copied this way (otherwise it will
      // require proj4 itself resulting in syntax errors again) and leaflet as
      // well because it needs to be loaded before proj4. And therefor also
      // leaflet.wms, because it will include leaflet otherwise.
      { from: './node_modules/leaflet/dist/leaflet.js' },
      { from: './node_modules/leaflet.wms/dist/leaflet.wms.js' },
      { from: './node_modules/proj4/dist/proj4.js' },
      { from: './node_modules/proj4leaflet/src/proj4leaflet.js' },

      // Dumb copy of all assets for now
      { from: './403-geen-toegang.html' },
      {
        from: './build/assets',
        to: 'assets'
      },
      { from: './bower_components/bbga_visualisatie_d3/liberation-sans.eot' },
      { from: './bower_components/bbga_visualisatie_d3/liberation-sans.woff2' },
      { from: './bower_components/bbga_visualisatie_d3/liberation-sans.woff' },
      { from: './bower_components/bbga_visualisatie_d3/liberation-sans.ttf' },
      { from: './bower_components/bbga_visualisatie_d3/liberation-sans.svg' },
    ]),
    new HtmlWebpackPlugin({
      inject: false,
      template: './index.ejs',
      minify: {
        collapseWhitespace: true
      },
      lang: 'nl',
      title: 'Dataportaal',
      favicon: './favicon.png',
      links: [
        {
          href: 'https://fast.fonts.net/cssapi/3680cf49-2b05-4b8a-af28-fa9e27d2bed0.css',
          rel: 'stylesheet'
        },
        {
          href: 'leaflet.css',
          rel: 'stylesheet'
        },
        {
          href: 'leaflet.draw.css',
          rel: 'stylesheet'
        },
        {
          href: 'bbga.css',
          rel: 'stylesheet'
        },
      ],
      scripts: [
        'leaflet.js',
        'leaflet.wms.js',
        'proj4.js',
        'proj4leaflet.js',
      ]
    })
  ]
};

module.exports = {
  common,
  root,
  src,
  legacy,
  dist
};
