'use strict';

const isVisible = require('../../../../e2e/helpers/is-visible');

module.exports = function (layerSelectionElement) {
    return function () {
        return {
            isVisible: isVisible(layerSelectionElement),
            close: function () {
                layerSelectionElement.element(by.css('.qa-layer-selection-close')).click();
            },
            baselayers: function () {
                return {
                    header: layerSelectionElement.element(by.css('.qa-baselayers-header')).getText,
                    options: function (index) {
                        return optionPageObject(layerSelectionElement.element(by.repeater('baseLayer in vm.allBaseLayers').row(index)));
                    }
                };
            }
        };
    };
};

function optionPageObject (categoryElement) {
    return {
        label: categoryElement.element(by.css('.qa-option-label')).getText
    };
}
