import _products from './map-layers';
import _base from './base-layers';

const TIMEOUT = 100;

function getBaseLayers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(_base), TIMEOUT);
  });
}

function getMapLayers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(_products), TIMEOUT);
  });
}

export default { getBaseLayers, getMapLayers };
