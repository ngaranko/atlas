'use strict';

const dashboardPageObjects = dp.require('modules/atlas/components/dashboard/dashboard.page-objects');

const roles = {
    EMPLOYEE: {
        password: process.env.PASSWORD_EMPLOYEE || 'Winterdag2016',
        username: process.env.USERNAME_EMPLOYEE || 'atlas.employee@amsterdam.nl'
    },
    EMPLOYEE_PLUS: {
        password: process.env.PASSWORD_EMPLOYEE_PLUS || 'Winterdag2016',
        username: process.env.USERNAME_EMPLOYEE_PLUS || 'atlas.employee.plus@amsterdam.nl'
    }
};

module.exports = function (pageName, role) {
    browser.get('http://localhost:8000');

    if (element(by.css('.qa-menu__login')).isPresent().then((present) => {
        if (present && role) {
            browser.driver.findElement(by.css('.qa-menu__login')).click();
            browser.driver.findElement(by.css('input[name="email"]')).sendKeys(roles[role].username);
            browser.driver.findElement(by.css('input[name="password"]')).sendKeys(roles[role].password);
            browser.driver.findElement(by.css('.c-form-buttons__button[value="employee_plus"]')).click();
            browser.refresh();
        } else if (!present && !role) {
            element(by.css('.qa-menu__toggle .qa-menu__link')).click();
            element(by.css('.qa-menu__dropdown dp-logout-button button')).click();
        }
        browser.getLocationAbsUrl(); // NB: Forces to await login flow completion
        browser.get(dp.availableStates[pageName].url);
    }));

    return {
        get title () {
            return browser.getTitle();
        },
        get dashboard () {
            return dashboardPageObjects(element(by.css('dp-dashboard')));
        }
    };
};
