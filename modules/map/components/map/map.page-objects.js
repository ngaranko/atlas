'use strict';

const toggleLayerSelectionPageObjects = dp.require('modules/map/components/toggle-layer-selection/toggle-layer-selection.page-objects');
const toggleFullscreenPageObjects = dp.require('modules/map/components/toggle-fullscreen/toggle-fullscreen.page-objects');

module.exports = function (mapElement) {
    return function () {
        return {
            isVisible: dp.isVisible(mapElement),
            toggleLayerSelection:
                toggleLayerSelectionPageObjects(mapElement.element(by.css('dp-toggle-layer-selection'))),
            toggleFullscreen: toggleFullscreenPageObjects(mapElement.element(by.css('dp-toggle-fullscreen')))
        };
    };
};
