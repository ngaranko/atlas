module.exports = function (grunt) {
    return {
        githooks: {
            all: {
                'pre-commit': 'test-js-modules'
            }
        }
    };
};
