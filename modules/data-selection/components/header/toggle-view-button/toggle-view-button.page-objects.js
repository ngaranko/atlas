'use strict';

module.exports = function (toggleViewButtonElement) {
    return {
        click: toggleViewButtonElement.element(by.css('button')).click
    };
};
