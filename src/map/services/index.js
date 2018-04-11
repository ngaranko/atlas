import mapLayers from './map-layers/map-layers';
import panelLayers from './panel-layers/panel-layers';
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

function getPanelLayers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(panelLayers), TIMEOUT);
  });
}

export default { getMapBaseLayers, getMapLayers, getPanelLayers };
