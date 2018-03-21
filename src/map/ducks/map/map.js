import BASE_LAYERS from '../../../shared/services/layers/base-layers.constant';
import ACTIONS from '../../../shared/actions';

export const getBaseLayer = (state, baseLayerOptions) => {
  const activeBaseLayer = BASE_LAYERS.find((item) => item.slug === state.map.baseLayer);
  return {
    urlTemplate: activeBaseLayer.urlTemplate,
    baseLayerOptions
  };
};

// TODO: 'Old actions' after integating new reducer edit actions
export const updateZoom = (payload) => ({ type: ACTIONS.MAP_ZOOM, payload });
export const updatePan = (payload) =>
  ({ type: ACTIONS.MAP_PAN, payload: [payload.center.lat, payload.center.lng] });
