var jsFiles = ['build/temp/bower_components.js'];
jsFiles = jsFiles.concat(require('./grunt/config/js-files'));

jsFiles.push('bower_components/angular-mocks/angular-mocks.js');
jsFiles.push('modules/**/*.test.js');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine-jquery', 'jasmine'],
        files: jsFiles,
        exclude : [
            'modules/**/piwik/piwik.run.js'
        ],
        plugins: [
            'karma-jasmine-jquery',
            'karma-jasmine',
            'karma-mocha-reporter',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-babel-preprocessor'
        ],
        // possible values: OFF, ERROR, WARN, INFO, DEBUG
        logLevel: 'ERROR',
        preprocessors: {
            'modules/**/!(*.test).js': ['babel', 'coverage']
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015']
            }
        },
        mochaReporter: {
            output: 'minimal'
        },
        coverageReporter: {
            type: 'html',
            dir: 'reports/coverage/',
            check: {
                global: {
                    statements: 95,
                    branches: 95,
                    functions: 95,
                    lines: 95
                }
            }
        },
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
