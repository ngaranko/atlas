'use strict';

module.exports = function (linkElement) {
    return {
        click: linkElement.element(by.css('.qa-dp-link')).click,
        get label () {
            return linkElement.getText();
        }
    };
};
