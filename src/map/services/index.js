import mapLayers from './map-layers';

const TIMEOUT = 100;

export default {
  getMapLayers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mapLayers), TIMEOUT);
    });
  }
};
