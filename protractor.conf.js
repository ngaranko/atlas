exports.config = {
    baseUrl: 'http://localhost:8000/',
    framework: 'jasmine',
    specs: 'e2e/**/*.test.js',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: false,
        maxInstances: 10,
        'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs'
    },
    onPrepare: function () {
        browser.driver.manage().window().setSize(1024, 768);

        global.dp = require('./e2e/helpers/datapunt');

        // dp.navigate requires that other helpers are already loaded, just making sure the others are initialized first
        global.dp.navigate = require('./e2e/helpers/navigate');
    }
};
