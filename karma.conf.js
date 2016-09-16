var jsFiles = require('./grunt/config/js-files');

jsFiles.push('bower_components/angular-mocks/angular-mocks.js');
jsFiles.push('modules/**/*.test.js');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine-jquery', 'jasmine'],
        files: jsFiles,

        plugins: [
            'karma-jasmine-jquery',
            'karma-jasmine',
            'karma-mocha-reporter',
            'karma-coverage',
            'karma-phantomjs-launcher'
        ],
        // possible values: OFF, ERROR, WARN, INFO, DEBUG
        logLevel: 'DEBUG',
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'modules/**/!(*.test).js': ['coverage']
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
        browsers: ['PhantomJS']
    });
};
