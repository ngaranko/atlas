'use strict';

const toggleLayerSelectionPO =
    dp.require('modules/map/components/toggle-layer-selection/toggle-layer-selection.page-objects');
const toggleFullscreenPO = dp.require('modules/map/components/toggle-fullscreen/toggle-fullscreen.page-objects');

module.exports = function (mapElement) {
    return function () {
        return {
            isVisible: dp.isVisible(mapElement),
            toggleLayerSelection: toggleLayerSelectionPO(mapElement.element(by.css('dp-toggle-layer-selection'))),
            toggleFullscreen: toggleFullscreenPO(mapElement.element(by.css('dp-toggle-fullscreen')))
        };
    };
};
