import getState from '../redux/get-state';
import SOURCES from '../layers/overlays.constant';

class ActiveOverlays {
  constructor() {
    this.allOverlays = [];
  }

  get getOverlays() {
    return this.allOverlays;
  }

  static isVisibleAtCurrentZoom(overlay, zoomLevel) {
    if (!SOURCES[overlay]) {
      return false;
    }
    const zoom = zoomLevel || getState().map.zoom;
    return zoom >= SOURCES[overlay].minZoom && zoom <= SOURCES[overlay].maxZoom;
  }

  setOverlays(newOverlays) {
    const overlaysAreEqual = newOverlays.every((overlay, index) => (
      this.allOverlays[index] && overlay.id === this.allOverlays[index].id));
    if (overlaysAreEqual) {
      return;
    }
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
    return this.allOverlays.filter((source) => (
      source.isVisible && ActiveOverlays.isVisibleAtCurrentZoom(source.id, zoom)))
      .map((source) => SOURCES[source.id]);
  }
}

export class ActiveOverlaysTest extends ActiveOverlays {}

export default new ActiveOverlays();
