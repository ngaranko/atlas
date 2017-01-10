const isVisible = require('../helpers/is-visible');

const loginPageObjects = require('./login');

module.exports = function (pageElement) {
    return function () {
        return {
            isVisible: isVisible(pageElement),
            text: pageElement.getText,
            login: loginPageObjects(pageElement.element(by.css('dp-login')))
        };
    };
};
