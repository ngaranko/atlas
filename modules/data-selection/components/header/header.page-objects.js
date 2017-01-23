'use strict';

module.exports = function () {
    return function (headerElement) {
        return {
            title: headerElement.element(by.css('h2')).getText
            // title: headerElement.element(by.css('.qa-title')).getText
        };
    };
};
