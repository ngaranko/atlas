'use strict';

const loginPageObjects = dp.require('modules/page/components/login-form/login-form.page-objects');

module.exports = function (pageElement) {
    return function () {
        return {
            isVisible: dp.isVisible(pageElement),
            text: pageElement.getText,
            login: loginPageObjects(pageElement.element(by.css('dp-login')))
        };
    };
};
