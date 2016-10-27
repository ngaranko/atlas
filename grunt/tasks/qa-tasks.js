module.exports = function (grunt) {
    var files = require('../config/js-files');

    // Configure lint tasks
    const linters = ['eslint', 'console-log-test'];
    const tasks = ['grunt', 'tests', 'modules'];

    const linttasks = linters
        .map(linter => tasks
            .map(task => `${linter}:${task}`))
        .reduce((result, lintertasks) => result.concat(lintertasks), []);

    grunt.registerTask('lint', linttasks);

    grunt.registerTask('test-js', [
        'lint',
        'test-js-modules'
    ]);

    grunt.registerTask('test-css', [
        'sasslint'
    ]);

    grunt.registerTask('test-js-modules', [
        'concat-tests',
        'babel-tests',
        'karma:coverage'
    ]);

    // Test a single module by concatenate the test files
    // have them transpiled
    // And then run karma
    // The tasks are a per-module version of the test-js task
    // A Taiga task has been made to have all modules tested with full coverage
    files.modules.forEach(module => {
        grunt.registerTask(`test-js-module-${module.slug}`,
            linters
                .map(linter => `newer:${linter}:module_${module.slug}`)
                .concat([
                    `concat:test_${module.slug}`,
                    `babel-test-${module.slug}`,
                    `karma:${module.slug}_all`
                ])
        );
    });

    grunt.registerTask('create-hooks', function () {
        var fs = require('fs');
        if (!grunt.file.exists('.git/hooks/pre-commit')) {
            grunt.file.copy('hooks', '.git/hooks');
            fs.chmodSync('.git/hooks', '755');
            console.log('Git hooks created in .git/hooks');
        } else {
            console.log ('Git hooks already present. Leaving them intact.');
        }
    });
};
