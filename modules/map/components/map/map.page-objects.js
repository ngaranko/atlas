'use strict';

const toggleLayerSelectionPO =
    dp.require('modules/map/components/toggle-layer-selection/toggle-layer-selection.page-objects');
const toggleFullscreenPO = dp.require('modules/map/components/toggle-fullscreen/toggle-fullscreen.page-objects');
const drawToolPO = dp.require('modules/map/components/draw-tool/draw-tool.page-objects');

module.exports = function (mapElement) {
    return {
        click: function (x, y) {
            browser.actions()
                .mouseMove(mapElement, {x: x, y: y})
                .click()
                .perform();

            return browser.sleep(1)
        },
        get visible () {
            return dp.visible(mapElement);
        },
        get toggleLayerSelection () {
            return toggleLayerSelectionPO(mapElement.element(by.css('dp-toggle-layer-selection')));
        },
        get toggleFullscreen () {
            return toggleFullscreenPO(mapElement.element(by.css('dp-toggle-fullscreen')));
        },
        get drawTool () {
            return drawToolPO(mapElement.element(by.css('dp-draw-tool')));
        },
        get hasGeometry () {
            const hasPoint = mapElement.element(by.css('.leaflet-marker-icon')).isPresent();
            const hasPolygon = mapElement.element(by.css('.leaflet-overlay-pane path.leaflet-interactive')).isPresent();

            return hasPoint || hasPolygon;
        },
        get hasPuntenwolk () {
            return mapElement.all(by.css('.o-highlight-cluster')).count().then(numberOfMarkers => numberOfMarkers > 0);
        }
    };
};
