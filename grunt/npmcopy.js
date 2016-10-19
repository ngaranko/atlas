module.exports = {
    options: {
        destPrefix: 'build/temp/npm_components/'
    },
    polyfill: {
        files: {
            'polyfill': ['babel-polyfill/dist/!(*.min).js']
        }
    },
    'leaflet-draw': {
        files: {
            'leaflet-draw': ['leaflet-draw/dist/**/*']
        }
    }
};
