import ActiveOverlays from '../../../../src/shared/services/active-overlays/active-overlays';
angular
    .module('dpShared')
    .factory('activeOverlays', activeOverlaysFactory);

activeOverlaysFactory.$inject = [];
 /* istanbul ignore next */
function activeOverlaysFactory () {
    return {
        getOverlays: () => ActiveOverlays.getOverlays(),
        setOverlays: (newOverlays) => ActiveOverlays.setOverlays(newOverlays),
        isVisibleAtCurrentZoom: (overlay, zoom) => ActiveOverlays.isVisibleAtCurrentZoom(overlay, zoom),
        getVisibleOverlays: (zoom) => ActiveOverlays.getVisibleOverlays(zoom),
        getOverlaysLabels: (zoom) => ActiveOverlays.getOverlaysLabels(zoom),
        getOverlaysWarning: (zoom) => ActiveOverlays.getOverlaysWarning(zoom)
    };
}
