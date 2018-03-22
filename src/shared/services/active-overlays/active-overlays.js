import getState from '../redux/get-state';
import SOURCES from '../layers/overlays.constant';

class ActiveOverlays {
  constructor() {
    this.allOverlays = [];
  }

  getOverlays() {
    return this.allOverlays
      .filter((overlay) => ActiveOverlays.isAuthorised(overlay));
  }

  static isVisibleAtCurrentZoom(overlay, zoomLevel) {
    if (!SOURCES[overlay]) {
      return false;
    }
    const zoom = zoomLevel || getState().map.zoom;
    return zoom >= SOURCES[overlay].minZoom && zoom <= SOURCES[overlay].maxZoom;
  }

  static isAuthorised(overlay) {
    const state = getState();
    const user = state.user;
    const layer = state.mapLayers.find((item) => item.id === overlay.id);
    const authScope = layer && layer.authScope;

    return SOURCES[overlay.id] && layer && (
      !authScope || (user.authenticated && user.scopes.includes(authScope))
    );
  }

  setOverlays(newOverlays) {
    this.allOverlays = newOverlays;
  }

  getVisibleOverlays(zoom) {
    return this.getVisibleSources(zoom)
      .filter((source) => source.detailUrl && source.detailItem)
      .filter((a, index, self) => self.findIndex((b) => b.detailItem === a.detailItem === index));
  }

  getOverlaysWarning(zoom) {
    return this.getVisibleSources(zoom)
      .filter((source) => source.noDetail)
      .map((a) => a.label_short)
      .join(', ');
  }

  getOverlaysLabels(zoom) {
    const labels = this.getVisibleSources(zoom)
      .map((a) => a.parent_label || a.label_short);

    return [...new Set(labels)].join(', ');
  }

  getVisibleSources(zoom) {
    return this.allOverlays
      .filter((source) => (
        source.isVisible &&
        ActiveOverlays.isAuthorised(source) &&
        ActiveOverlays.isVisibleAtCurrentZoom(source.id, zoom)
      ))
      .map((source) => SOURCES[source.id]);
  }
}

export default new ActiveOverlays();
