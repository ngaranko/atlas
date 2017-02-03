'use strict';

module.exports = function (stelselpediaHeaderElement) {
    return {
        get title () {
            return stelselpediaHeaderElement.element(by.css('.qa-title')).getText();
        },
        get subtitle () {
            return stelselpediaHeaderElement.element(by.css('.qa-subtitle')).getText();
        }
    };
};
