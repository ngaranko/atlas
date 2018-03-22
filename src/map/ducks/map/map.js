import { createUrlWithToken } from '../../../shared/services/api/api';

import SOURCES from '../../../shared/services/layers/overlays.constant';
import BASE_LAYERS from '../../../shared/services/layers/base-layers.constant';
import ACTIONS from '../../../shared/actions';

import getMapConfig from '../../services/map-config';

export const getBaseLayer = (state, baseLayerOptions) => {
  const activeBaseLayer = BASE_LAYERS.find((item) => item.slug === state.map.baseLayer);
  return {
    urlTemplate: activeBaseLayer.urlTemplate,
    baseLayerOptions
  };
};

const generateLayer = (overlay, url) => ({
  ...overlay,
  overlayOptions: {
    ...getMapConfig().OVERLAY_OPTIONS,
    layers: SOURCES[overlay.id].layers
  },
  url
});

export const getLayers = (state) => { // eslint-disable-line
  return !state.mapLayers.length ? [] : state.map.overlays.map((overlay) => {
    // const layer = state.mapLayers.find((mapLayer) => mapLayer.id === overlay.id);
    const layer = SOURCES[overlay.id];
    if (!layer) {
      return false;
    }
    if (!layer.authScope) {
      return generateLayer(overlay, `${getMapConfig().OVERLAY_ROOT}/${layer.url}`);
    }
    const token = state.user.accessToken;
    if (token) {
      return generateLayer(overlay, createUrlWithToken(`${getMapConfig().OVERLAY_ROOT}/${layer.url}`, token)); //eslint-disable-line
    }
    return false;
  }).filter((layer) => layer !== false);
};

// TODO: 'Old actions' after integating new reducer edit actions
export const updateZoom = (payload) => ({ type: ACTIONS.MAP_ZOOM, payload });
export const updatePan = (payload) =>
  ({ type: ACTIONS.MAP_PAN, payload: [payload.center.lat, payload.center.lng] });

// const 'https://acc.map.data.amsterdam.nl' = '/maps/wkpb?service=WMS&request=GetMap&version=1.1.1&layers=wkpb&styles=&format=image%2Fpng&transparent=true&identify=false&srs=EPSG%3A28992&width=2511&height=431&bbox=119520.05142265803,487113.42916879704,121629.49709240613,487474.6910304847';
// const 'http://localhost:8080' = '/maps/wkpb?version=1.3.0&service=WMS&service=WMS&request=GetMap&layers=&styles=&format=image%2Fpng&transparent=true&version=1.1.1&identify=false&width=256&height=256&srs=EPSG%3A28992&bbox=120378.56008995953,487084.48046146997,120593.60009015235,487299.5204615981';
