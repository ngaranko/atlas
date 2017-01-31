'use strict';

module.exports = function (headerElement) {
    return function () {
        return {
            title: headerElement.element(by.css('h2')).getText
            // title: headerElement.element(by.css('.qa-title')).getText
        };
    };
};
