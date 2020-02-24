const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { commonConfig } = require('./webpack.common.js')
const { GenerateSW } = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => {
  const CHUNKS = {
    MAP:
      'leaflet|leaflet-draw|leaflet-rotatedmarker|leaflet.markercluster|leaflet.nontiledlayer|proj4|proj4leaflet',
    DATAPUNT: '@datapunt',
    STYLED: 'styled-components|polished|style-loader|css-loader|sass-loader|postcss-loader',
    PANORAMA: 'marzipano',
    POLYFILL: 'isomorphic-fetch|core-js|objectFitPolyfill',
    ANGULAR: 'angular|angular-aria|angular-sanitize|react-angular',
    REACT:
      'react|react-dom|redux-first-router|redux-first-router-link|redux-first-router-restore-scroll|reselect|redux|@?redux-saga|react-redux|react-helmet|prop-types',
  }

  const getTestRegex = path => new RegExp(`/node_modules/(${path})/`)

  return merge(commonConfig(), {
    output: {
      filename: '[name].js?id=[chunkhash]',
      chunkFilename: '[name].bundle.js?id=[chunkhash]',
    },
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          vendor: {
            test: new RegExp(
              `/node_modules/(?!${[
                CHUNKS.DATAPUNT,
                CHUNKS.POLYFILL,
                CHUNKS.MAP,
                CHUNKS.STYLED,
                CHUNKS.REACT,
                CHUNKS.PANORAMA,
                CHUNKS.BBGA,
                CHUNKS.ANGULAR,
              ].join('|')})/`,
            ),
            name: 'vendor',
            chunks: 'all',
          },
          datapunt: {
            test: getTestRegex(CHUNKS.DATAPUNT),
            name: 'datapunt',
            chunks: 'all',
            enforce: true,
          },
          polyfill: {
            test: getTestRegex(CHUNKS.POLYFILL),
            name: 'polyfill',
            chunks: 'all',
            enforce: true,
          },
          map: {
            test: getTestRegex(CHUNKS.MAP),
            name: 'map',
            chunks: 'async',
            enforce: true,
          },
          bbga: {
            test: getTestRegex(CHUNKS.BBGA),
            name: 'bbga',
            chunks: 'async',
            enforce: true,
          },
          panorama: {
            test: getTestRegex(CHUNKS.PANORAMA),
            name: 'panorama',
            chunks: 'async',
            enforce: true,
          },
          styled: {
            test: getTestRegex(CHUNKS.STYLED),
            name: 'styled',
            chunks: 'all',
            enforce: true,
          },
          react: {
            test: getTestRegex(CHUNKS.REACT),
            name: 'react',
            chunks: 'all',
            enforce: true,
          },
          angular: {
            test: getTestRegex(CHUNKS.ANGULAR),
            name: 'angular',
            chunks: 'async',
            enforce: true,
          },
          main: {
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: true,
    },
    plugins: [
      new MiniCssExtractPlugin('main.[contenthash].css'),
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        exclude: [/\.map$/, /\.json$/],
        navigateFallbackDenylist: [
          // Exclude any URLs whose last part seems to be a file extension
          // as they're likely a resource and not a SPA route.
          // URLs containing a "?" character won't be blacklisted as they're likely
          // a route with query params (e.g. auth callbacks).
          new RegExp('/[^/?]+\\.[^/]+$'),
        ],
        cleanupOutdatedCaches: true,
        // Temporary disabled this, since we do not want to cache responses that require authorization
        //
        // runtimeCaching: [
        //   {
        //     urlPattern: new RegExp(apiUrl),
        //     handler: 'StaleWhileRevalidate',
        //     options: {
        //       cacheName: 'api',
        //       expiration: {
        //         maxAgeSeconds: 60 * 60 * 12, // 12h
        //       },
        //       cacheableResponse: {
        //         statuses: [0, 200],
        //       },
        //     },
        //   },
        //   {
        //     urlPattern: new RegExp(`${cmsUrl}(?!/jsonapi/node/notification)`),
        //     handler: 'StaleWhileRevalidate',
        //     options: {
        //       cacheName: 'cms',
        //       expiration: {
        //         maxAgeSeconds: 60 * 60 * 12, // 12h
        //       },
        //       cacheableResponse: {
        //         statuses: [0, 200],
        //       },
        //     },
        //   },
        // ],
      }),
    ],
  })
}
