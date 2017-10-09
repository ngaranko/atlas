import _products from './map-layers';

const TIMEOUT = 100;

export default {
  getMapLayers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(_products), TIMEOUT);
    });
  }
};
