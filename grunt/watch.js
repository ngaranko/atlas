module.exports = {
    modules: {
        files: [
            'modules/**/!(*.test).js',
            'modules/**/*.html'
        ],
        tasks: [
            'clean:js',
            'build-js',
            'test-js'
        ]
    },
    css: {
        files: [
            'modules/**/*.scss'
        ],
        tasks: [
            'clean:css',
            'build-css',
            'test-css'
        ]
    },
    tests: {
        files: [
            'modules/**/*.test.js'
        ],
        tasks: [
            'test-js'
        ]
    },
    static: {
        files: [
            'index.html'
        ],
        tasks: [
            'build-develop'
        ]
    },
    assets: {
        files: 'modules/shared/assets/**/*',
        tasks: ['copy:assets']
    },
    livereload: {
        options: {
            livereload: true
        },
        files: [
            'build/**/*',
            '!build/temp/**/*'
        ]
    }
};
