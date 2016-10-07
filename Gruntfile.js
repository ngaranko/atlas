module.exports = function (grunt) {
    var shortid = require('shortid');

    /**
     * An ID that is unique for each build to prevent browser caching. This needs to be set before the other
     * configuration which relies on this ID.
     */
    var uniqueIdJs = shortid.generate();
    var uniqueIdCss = shortid.generate();

    grunt.config.set('uniqueIdJs', uniqueIdJs);
    grunt.config.set('uniqueIdCss', uniqueIdCss);

    grunt.initConfig({
        babel: require('./grunt/babel')(grunt),
        bower_concat: require('./grunt/bower-concat'),
        clean: require('./grunt/clean'),
        concat: require('./grunt/concat')(grunt),
        connect: require('./grunt/connect'),
        'console-log-test': require('./grunt/console-log-test'),
        copy: require('./grunt/copy')(grunt),
        eslint: require('./grunt/eslint'),
        jshint: require('./grunt/jshint'),
        karma: require('./grunt/karma'),
        ngtemplates: require('./grunt/angular-templates'),
        npmcopy: require('./grunt/npmcopy'),
        postcss: require('./grunt/postcss')(grunt),
        sass: require('./grunt/sass'),
        sasslint: require('./grunt/sasslint'),
        tags: require('./grunt/script-link-tags')(grunt),
        watch: require('./grunt/watch')
    });

    grunt.registerTask('build-develop', [
        'clean:build',

        'copy:index',
        'copy:assets',
        'copy:bower_bbga_fonts',
        'copy:bower_leaflet_images',
        'copy:bower_leaflet_measure_images',

        'build-js',
        'build-css'
    ]);

    grunt.registerTask('build-release', [
        'build-develop',
        'clean:temp'
    ]);

    grunt.registerTask('build-js-bower', [
        'npmcopy',          // build temp/npm_components
        'bower_concat:js',  // build temp/bower_components
        'concat:npm_bower'  // combine npm and bower components into one js file
    ]);

    grunt.registerTask('build-js-modules', [
        'newer:ngtemplates',
        'concat:modules',
        'babel-modules-configure',
        'babel:modules'
    ]);

    // Configure lint tasks
    var linttasks = [];
    ['jshint', 'eslint', 'console-log-test'].forEach(function(linter) {
        ['grunt', 'tests', 'modules'].forEach(function(part) {
            linttasks.push('newer:' + linter + ':' + part);
        });
    });
    grunt.registerTask('lint', linttasks);

    grunt.registerTask('test-js', [
        'lint',
        'test-js-modules'
    ]);

    grunt.registerTask('test-css', [
        'sasslint'
    ]);

    grunt.registerTask('test-js-modules', [
        'newer:concat:tests',
        'babel-tests-configure',
        'newer:babel:tests',
        'karma:coverage'
    ]);

    /**
     * The output of build-js are two files 'build/atlas.js' and a source map.
     */
    grunt.registerTask('build-js', [
        'build-js-bower',
        'update-build-js'
    ]);

    grunt.registerTask('update-build-js', [
        'copy:bower',    // copy bower, do not rebuild bower
        'build-js-modules',
        'tags:js'
    ]);

    /**
     * The output of build-css are two files 'build/atlas.css' and a source map.
     */
    grunt.registerTask('build-css', [
        'bower_concat:css',
        'update-build-css'
    ]);

    grunt.registerTask('update-build-css', [
        'sass',
        'concat:css',
        'postcss',
        'tags:css'
    ]);
    /**
     * 'default' formerly known as 'grunt serve'
     */
    grunt.registerTask('default', [
        'build-develop',
        'connect:build',
        'watch'
    ]);

    grunt.registerTask('test', [
        'build-develop',
        'test-js',
        'test-css'
    ]);

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-console-log-test');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-npmcopy');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.loadNpmTasks('grunt-script-link-tags');
};