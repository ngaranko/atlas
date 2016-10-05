module.exports = function (grunt) {

    var uniqueIdJs = grunt.config.get('uniqueIdJs');

    return {
        options: {
            sourceMap: true,
            compact: false,
            presets: ['es2015']
        },
        tests: {
            options: {
                // inputSourceMap: this file is not yet available, inject name after babel task has finished,
            },
            files: {
                'build/temp/babel/atlas.tests.es5.js': 'build/temp/babel/atlas.tests.es6.js'
            }
        },
        modules: {
            options: {
                // inputSourceMap: this file is not yet available, inject name after babel task has finished,
            },
            files: [{
                expand: true,
                flatten: true,
                src: ['build/temp/babel/atlas.' + uniqueIdJs + '.js'],
                dest: 'build/'
            }]
        }
    };
};