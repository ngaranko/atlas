'use strict';

const toggleLayerSelectionPO =
    dp.require('modules/map/components/toggle-layer-selection/toggle-layer-selection.page-objects');
const toggleFullscreenPO = dp.require('modules/map/components/toggle-fullscreen/toggle-fullscreen.page-objects');

module.exports = function (mapElement) {
    return {
        element: mapElement,
        click: mapElement.element(by.css('.c-map__leaflet')).click,
        get visible () {
            return dp.visible(mapElement);
        },
        get toggleLayerSelection () {
            return toggleLayerSelectionPO(mapElement.element(by.css('dp-toggle-layer-selection')));
        },
        get toggleFullscreen () {
            return toggleFullscreenPO(mapElement.element(by.css('dp-toggle-fullscreen')));
        }
    };
};
