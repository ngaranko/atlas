'use strict';

module.exports = function (pageElement) {
    return {
        get close () {
            return close(pageElement.element(by.css('.qa-straatbeeld-close')));
        },
        get visible () {
            return dp.visible(pageElement);
        }
    };
};

function close (closeElement) {
    return {
        click: closeElement.click
    };
}
