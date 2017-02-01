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
                return categoryPageObject(
                    layerSelectionElement.element(by.css('.qa-baselayers')),
                    'baseLayer in vm.allBaseLayers'
                );
            },
            overlays: function () {
                return {
                    categories: function (index) {
                        return categoryPageObject(
                            layerSelectionElement.element(by.repeater('category in vm.allOverlays').row(index)),
                            'overlay in category.overlays'
                        );
                    }
                };
            }
        };
    };
};

function categoryPageObject (categoryElement, repeatBy) {
    return {
        header: categoryElement.element(by.css('.qa-category-header')).getText,
        options: function (index) {
            return optionPageObject(categoryElement.element(by.repeater(repeatBy).row(index)));
        }
    }
}

function optionPageObject (optionElement) {
    return {
        label: optionElement.element(by.css('.qa-option-label')).getText
    };
}
