'use strict';

module.exports = function (layerSelectionElement) {
    return {
        click: layerSelectionElement.element(by.css('button')).click
    };
};
