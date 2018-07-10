import getState from '../redux/get-state';

import mapLayers from '../../../map/services/map-layers/map-layers.config';

const findLayer = (id) => mapLayers.find((mapLayer) => mapLayer.id === id);

class ActiveOverlays {
  constructor() {
    this.allOverlays = [];
  }

  getOverlays() {
    return this.allOverlays
      .filter((overlay) => ActiveOverlays.isAuthorised(overlay));
  }

  static isVisibleAtCurrentZoom(overlay, zoomLevel) {
    const layer = findLayer(overlay);
    if (!layer) {
      return false;
    }
    const zoom = zoomLevel || getState().map.zoom;
    return zoom >= layer.minZoom && zoom <= layer.maxZoom;
  }

  static isAuthorised(overlay) {
    const state = getState();
    const user = state.user;
    const layer = state.mapLayers.find((item) => (
      (item.id && item.id === overlay.id) ||
      (item.legendItems && item.legendItems.length &&
        item.legendItems.some((legendItem) => (
          legendItem.id === overlay.id
        ))
      )
    ));
    const authScope = layer && layer.authScope;

    return findLayer(overlay.id) && layer && (
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
      .map((source) => findLayer(source.id));
  }
}

export default new ActiveOverlays();
