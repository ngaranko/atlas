exports.config = {
    baseUrl: 'http://localhost:8000/',
    framework: 'jasmine',
    specs: 'e2e/*.test.js',
    capabilities: {
        browserName: 'phantomjs',
        'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs'
    },
    onPrepare: function () {
        global.dp = require('./e2e/helpers/datapunt');
    }
};
