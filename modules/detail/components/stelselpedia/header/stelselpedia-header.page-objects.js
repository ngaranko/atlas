'use strict';

module.exports = function (stelselpediaHeaderElement) {
    return function () {
        return {
            title: stelselpediaHeaderElement.element(by.css('.qa-title')).getText,
            subtitle: stelselpediaHeaderElement.element(by.css('.qa-subtitle')).getText
        };
    };
};
