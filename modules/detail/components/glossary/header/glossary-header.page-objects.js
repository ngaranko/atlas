'use strict';

module.exports = function (glossaryHeaderElement) {
    return {
        get title () {
            return glossaryHeaderElement.element(by.css('.qa-title')).getText();
        },
        get subtitle () {
            return glossaryHeaderElement.element(by.css('.qa-subtitle')).getText();
        }
    };
};
