'use strict';

const toggleLayerSelectionPO =
    dp.require('modules/map/components/toggle-layer-selection/toggle-layer-selection.page-objects');
const toggleFullscreenPO = dp.require('modules/map/components/toggle-fullscreen/toggle-fullscreen.page-objects');

module.exports = function (mapElement) {
    return {
        get visible () {
            return dp.visible(mapElement);
        },
        get toggleLayerSelection () {
            return toggleLayerSelectionPO(mapElement.element(by.css('dp-toggle-layer-selection')));
        },
        get toggleFullscreen () {
            return toggleFullscreenPO(mapElement.element(by.css('dp-toggle-fullscreen')));
        },
        get hasGeometry () {
            const hasPoint = mapElement.element(by.css('.leaflet-marker-icon[src="assets/icons/icon-detail.svg"]')).isPresent();
            const hasPolygon = mapElement.element(by.css('.leaflet-overlay-pane path.leaflet-interactive')).isPresent();

            return hasPoint || hasPolygon;
        }
    };
};
