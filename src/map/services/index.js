import mapLayers from './map-layers';
import mapBaseLayers from './map-base-layers';

const TIMEOUT = 100;

function getMapBaseLayers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mapBaseLayers), TIMEOUT);
  });
}

function getMapLayers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mapLayers), TIMEOUT);
  });
}

export default { getMapBaseLayers, getMapLayers };
