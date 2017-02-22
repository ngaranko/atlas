'use strict';

module.exports = function (hotspotElement) {
    return {
        click: function () {
            browser.executeScript('arguments[0].click();', hotspotElement.element(by.css('button')));
        }
    };
};
