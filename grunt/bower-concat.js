module.exports = {
    js: {
        mainFiles: {
            'angular-i18n': ['angular-locale_nl-nl.js'],
            leaflet: ['dist/leaflet.js', 'dist/leaflet.css'],
            'raven-js': ['dist/raven.js', 'dist/plugins/angular.js']
        },
        dest: {
            js: 'build/temp/bower_components/bower_components.js'
        },
        dependencies: {
            'angular-i18n': 'angular',
            'angular-mocks': 'angular',
            'angular-sanitize': 'angular',
            'leaflet-rotatedmarker': 'leaflet',
            'bbga_visualisatie_d3': 'd3'
        }
    },
    css: {
        dest: {
            css: 'build/temp/bower_components/bower_components.css'
        }
    }
};
