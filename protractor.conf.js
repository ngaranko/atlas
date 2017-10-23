var ENV_VARIABLES = [
    'PASSWORD_EMPLOYEE',
    'USERNAME_EMPLOYEE',
    'PASSWORD_EMPLOYEE_PLUS',
    'USERNAME_EMPLOYEE_PLUS'
];

for (var VARIABLE of ENV_VARIABLES) {
    if (!process.env[VARIABLE]) {
        console.error('missing environmental variable, ', VARIABLE); // eslint-disable-line angular/log, no-console
        process.exit(1); // exit failure
    }
}

exports.config = {
    baseUrl: 'http://localhost:8080/',
    framework: 'jasmine',
    specs: 'e2e/**/*.test.js',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 4
    },
    chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.33',
    onPrepare: function () {
        browser.driver.manage().window().setSize(1024, 768);

        global.dp = require('./e2e/helpers/datapunt');

        // dp.navigate requires that other helpers are already loaded, just making sure the others are initialized first
        global.dp.navigate = require('./e2e/helpers/navigate');
    }
};
