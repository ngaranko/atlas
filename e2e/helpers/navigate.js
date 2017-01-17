'use strict';

const availableStates = require('./available-states');
const dashboardPageObjects = require('../../modules/atlas/components/dashboard/dashboard.page-objects');

module.exports = function (pageName) {
    browser.get(availableStates[pageName].url);

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
