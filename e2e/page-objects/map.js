const toggleLayerSelectionPageObjects = require('./toggle-layer-selection.js');
const activeOverlaysPageObjects = require('./active-overlays.js');
const toggleFullscreenPageObjects = require('./toggle-fullscreen.js');

module.exports = function (mapElement) {
    return function () {
        return {
            isActive: function () {
                return mapElement.isPresent()
            },
            isVisible: function () {
                return mapElement.getAttribute('class').then(function (className) {
                    return className.match(/ng-hide/) === null;
                });
            },
            toggleLayerSelection: toggleLayerSelectionPageObjects(mapElement.element(by.css('dp-toggle-layer-selection')))//,
            //activeOverlays: activeOverlaysPageObjects(mapElement.element(by.css('dp-active-overlays'))),
            //toggleFullscreen: toggleFullscreenPageObjects(mapElement.element(by.css('dp-toggle-fullscreen')))
        };
    };
};
