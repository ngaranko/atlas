/* globals L */
import { getCurrentLocation } from './panControls';
import { updateZoom } from '../ducks/map/map';

const addHeading = (element, text) => {
  const headingNode = document.createElement('H3');
  const textNode = document.createTextNode(text);
  headingNode.appendChild(textNode);
  headingNode.setAttribute('class', 'u-sr-only');
  if (element && element.append) {
    element.append(headingNode);
  }
};

const setDoubleClickZoom = (leafletMap, maxZoom) => {
  if (leafletMap.getZoom() === maxZoom) {
    leafletMap.doubleClickZoom.disable();
  } else {
    leafletMap.doubleClickZoom.enable();
  }
};

export const initialize = (store, mapConfig, leafletMap) => {
  const scaleControl = L.control.scale(mapConfig.SCALE_OPTIONS);
  scaleControl.addTo(leafletMap);
  addHeading(scaleControl.getContainer(), 'Kaartschaal');

  L.control.zoom(mapConfig.ZOOM_OPTIONS).addTo(leafletMap);

  const maxZoom = mapConfig.BASE_LAYER_OPTIONS.maxZoom;

  setDoubleClickZoom(leafletMap, maxZoom);

  leafletMap.on('zoomend', () => {
    setDoubleClickZoom(leafletMap, maxZoom);

    store.dispatch(
      updateZoom({
        viewCenter: getCurrentLocation(leafletMap),
        zoom: leafletMap.getZoom()
      })
    );
  });
};

export const setZoom = (leafletMap, zoomLevel) => {
  leafletMap.setZoom(zoomLevel, {
    animate: false
  });
};

