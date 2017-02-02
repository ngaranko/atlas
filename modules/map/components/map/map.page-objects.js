'use strict';

const isVisible = require('../../../../e2e/helpers/is-visible');

const toggleLayerSelectionPageObjects = require('./../toggle-layer-selection/toggle-layer-selection.page-objects.js');
const toggleFullscreenPageObjects = require('./../toggle-fullscreen/toggle-fullscreen.page-objects.js');

module.exports = function (mapElement) {
    return function () {
        return {
            isVisible: isVisible(mapElement),
            toggleLayerSelection:
                toggleLayerSelectionPageObjects(mapElement.element(by.css('dp-toggle-layer-selection'))),
            toggleFullscreen: toggleFullscreenPageObjects(mapElement.element(by.css('dp-toggle-fullscreen')))
        };
    };
};
