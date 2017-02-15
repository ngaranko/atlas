'use strict';

module.exports = function (toggleStraatbeeldFullscreenElement) {
    return {
        click: toggleStraatbeeldFullscreenElement.element(by.css('a')).click
    };
};
