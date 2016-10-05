module.exports = function (grunt) {
    var jsFiles = require('./config/js-files'),
        cssFiles = require('./config/css-files'),
        uniqueIdJs,
        uniqueIdCss;

    uniqueIdJs = grunt.config.get('uniqueIdJs');
    uniqueIdCss = grunt.config.get('uniqueIdCss');

    return {
        options: {
            sourceMap: true
        },
        bower: {
            src: ['build/temp/bower_components.js'],
            dest: 'build/atlas.libs.' + uniqueIdJs + '.js'
        },
        tests: {
            src: ['modules/**/*.test.js'],
            dest: 'build/temp/babel/atlas.tests.es6.js'
        },
        modules: {
            src: jsFiles,
            dest: 'build/temp/babel/atlas.' + uniqueIdJs + '.js'
        },
        js: {
            src: jsFiles,
            dest: 'build/atlas.' + uniqueIdJs + '.js'
        },
        css: {
            src: cssFiles,
            dest: 'build/atlas.' + uniqueIdCss + '.css'
        }
    };
};