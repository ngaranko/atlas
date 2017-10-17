import mapLayers from './map-layers';
import baseLayers from './base-layers';

const TIMEOUT = 100;

function getBaseLayers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(baseLayers), TIMEOUT);
  });
}

function getMapLayers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mapLayers), TIMEOUT);
  });
}

export default { getBaseLayers, getMapLayers };
