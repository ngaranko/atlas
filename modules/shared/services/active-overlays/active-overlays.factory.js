import ActiveOverlays from '../../../../src/shared/services/active-overlays/active-overlays';
angular
    .module('dpShared')
    .factory('activeOverlays', activeOverlaysFactory);

activeOverlaysFactory.$inject = [];
 /* istanbul ignore next */
function activeOverlaysFactory () {
    return {
        getOverlays: getOverlays,
        setOverlays: setOverlays,
        isVisibleAtCurrentZoom: isVisibleAtCurrentZoom,
        getVisibleOverlays: getVisibleOverlays,
        getOverlaysLabels: getOverlaysLabels,
        getOverlaysWarning: getOverlaysWarning
    };

    // public methods
    function getOverlays () {
        return ActiveOverlays.getOverlays();
    }

    function setOverlays (newOverlays) {
        ActiveOverlays.setOverlays(newOverlays);
    }

    function isVisibleAtCurrentZoom (overlay, zoom) {
        return ActiveOverlays.isVisibleAtCurrentZoom(overlay, zoom);
    }

    function getVisibleOverlays (zoom) {
        return ActiveOverlays.ActiveOverlays(zoom);
    }

    function getOverlaysWarning (zoom) {
        return ActiveOverlays.getOverlaysWarning(zoom);
    }

    function getOverlaysLabels (zoom) {
        return ActiveOverlays.getOverlaysLabels(zoom);
    }
}
