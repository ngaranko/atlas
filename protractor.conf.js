exports.config = {
    //seleniumServerJar: 'webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
    framework: 'jasmine',
    specs: 'e2e/*.test.js',
    capabilities: {
        browserName: 'phantomjs',
        'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs'
    }
};
