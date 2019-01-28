import ActiveOverlays from '../../../../src/shared/services/active-overlays/active-overlays';
angular
    .module('dpShared')
    .factory('activeOverlays', activeOverlaysFactory);

activeOverlaysFactory.$inject = [];
 /* istanbul ignore next */
function activeOverlaysFactory () {
    return {
        getOverlays: () => ActiveOverlays.getOverlays(),
        getOverlaysWarning: (zoom) => ActiveOverlays.getOverlaysWarning(zoom)
    };
}
