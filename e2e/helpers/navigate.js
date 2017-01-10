const dashboardPageObjects = require('../page-objects/dashboard.js');

const URLS = {
    HOMEPAGE: 'http://localhost:8000/'
};

module.exports = function (pageName) {
    browser.get(URLS[pageName]);

    return {
        title,
        dashboard
    };

    function title () {
        return browser.getTitle();
    }

    function dashboard () {
        return dashboardPageObjects(element(by.css('dp-dashboard')));
    }
};
