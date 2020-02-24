import mapLayers, { mapPanelLayers, mapBaseLayers } from './map-layers/map-layers.config'

export function getMapBaseLayers() {
  return new Promise(resolve => resolve(mapBaseLayers))
}

export function getMapLayers() {
  return new Promise(resolve => resolve(mapLayers))
}

export function getPanelLayers() {
  return new Promise(resolve => resolve(mapPanelLayers))
}
