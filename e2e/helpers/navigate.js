'use strict';

const dashboardPageObjects = dp.require('modules/atlas/components/dashboard/dashboard.page-objects');

module.exports = function (pageName) {
    browser.get(dp.availableStates[pageName].url);

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
