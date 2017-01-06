const dashboardPageObjects = require('../page-objects/dashboard.js');

module.exports = function (url) {
    browser.get(url);

    return {
        title,
        dashboard
    };

    function title () {
        return browser.getTitle();
    }

    function dashboard () {
        console.log(dashboardPageObjects(element(by.css('dp-dashboard'))));
        return dashboardPageObjects(element(by.css('dp-dashboard')));
    }
};
