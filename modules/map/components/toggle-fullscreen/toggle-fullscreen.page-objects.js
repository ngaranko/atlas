'use strict';

module.exports = function (toggleFullscreenElement) {
    return {
        click: toggleFullscreenElement.element(by.css('button')).click,
        get text () {
            return toggleFullscreenElement.element(by.css('button')).getAttribute('title');
        }
    };
};
