'use strict';

module.exports = function (toggleDrawingToolElement) {
    return {
        click: toggleDrawingToolElement.element(by.css('button')).click,
        text: toggleDrawingToolElement.element(by.css('button')).getText
    };
};
