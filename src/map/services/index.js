import mapLayers from './map-layers/map-layers.config';
import mapPanelLayers from './map-panel-layers/map-panel-layers.config';
import mapBaseLayers from './map-base-layers/map-base-layers.config';

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
