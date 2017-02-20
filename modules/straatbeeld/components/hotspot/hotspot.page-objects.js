'use strict';

module.exports = function (hotspotElement) {
    return {
        click: hotspotElement.element(by.css('button')).click
    };
};
