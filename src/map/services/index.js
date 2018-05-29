import mapLayers from './map-layers/map-layers';
import mapPanelLayers from './map-panel-layers/map-panel-layers';
import mapBaseLayers from './map-base-layers/map-base-layers';

const TIMEOUT = 100;

export function getMapBaseLayers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mapBaseLayers), TIMEOUT);
  });
}

export function getMapLayers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mapLayers), TIMEOUT);
  });
}

export function getPanelLayers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mapPanelLayers), TIMEOUT);
  });
}

export default { getMapBaseLayers, getMapLayers, getPanelLayers };
