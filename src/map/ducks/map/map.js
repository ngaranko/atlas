import { createUrlWithToken } from '../../../shared/services/api/api';

import SOURCES from '../../../shared/services/layers/overlays.constant';
import BASE_LAYERS from '../../../shared/services/layers/base-layers.constant';
import ACTIONS from '../../../shared/actions';

import MAP_CONFIG from '../../services/map-config';

// HELPER METHODS
const getActiveBaselayer = (slug) => BASE_LAYERS.find((layer) => layer.slug === slug);
const generateLayer = (overlay, url) => ({
  ...overlay,
  url,
  overlayOptions: {
    ...MAP_CONFIG.OVERLAY_OPTIONS,
    layers: SOURCES[overlay.id].layers
  }
});

// SELECTORS
export const getBaseLayer = (state, baseLayerOptions) => ({
  urlTemplate: getActiveBaselayer(state.map.baseLayer).urlTemplate,
  baseLayerOptions
});

export const getLayers = (state) => (
  state.map.overlays.map((overlay) => {
    const layer = SOURCES[overlay.id];
    if (!layer) {
      return false;
    }
    const layerUrl = `${MAP_CONFIG.OVERLAY_ROOT}/${layer.url}`;
    if (!layer.authScope) {
      return generateLayer(overlay, layerUrl);
    }
    const token = state.user.accessToken;
    if (token) {
      return generateLayer(
        overlay,
        createUrlWithToken(layerUrl, token)
      );
    }
    return false;
  })
  .filter((layer) => layer !== false));

// ACTIONS CREATORS
export const updateZoom = (payload) => ({ type: ACTIONS.MAP_ZOOM, payload });
export const updatePan = (payload) =>
  ({ type: ACTIONS.MAP_PAN, payload: [payload.center.lat, payload.center.lng] });
