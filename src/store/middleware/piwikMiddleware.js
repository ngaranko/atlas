import piwikTracker from '../../shared/services/piwik-tracker/piwik-tracker';
import { SET_MAP_BASE_LAYER, TOGGLE_MAP_OVERLAY } from '../../map/ducks/map/map';

const piwik = {
  TRACK_EVENT: 'trackEvent',
  SET_MAP_BASE_LAYER: 'achtergrond',
  TOGGLE_MAP_OVERLAY: 'kaartlaag'
};

/** Match the BaseLayer from the Action to the State */
const getMapBaseLayer = (payload, { map, mapLayers }) => {
  const { baseLayers } = mapLayers;
  const newBaseLayerId = payload;

  let newBaseLayer;

  // Check if layer isn't already activated
  if (newBaseLayerId !== map.baseLayer) {
    // Return layer info from the store
    newBaseLayer = baseLayers.items.find((b) => b.value === newBaseLayerId);
  }

  return newBaseLayer || null;
};

/** Match the PanelLayer from the Action to the State */
const getMapPanelLayer = (payload, { map, mapLayers }) => {
  const { panelLayers } = mapLayers;
  const { overlays: activePanelLayers } = map;
  const newPanelLayerId = payload;

  let newPanelLayer;
  let parentPanelLayer;

  // Check if layer isn't already activated
  if (!activePanelLayers.filter((b) => b.id === newPanelLayerId).length) {
    // Get layer info from the store
    newPanelLayer = panelLayers.items.find((b) => b.id === newPanelLayerId);

    // Look through legendItems if not found
    // Return object with info about parentPanelLayer
    parentPanelLayer = (!newPanelLayer) ? panelLayers.items.map(
        (panelLayer) => (panelLayer.legendItems.filter(
          (b) => b.id === newPanelLayerId)).length && panelLayer
      ).filter((obj) => obj) : false;
  }

  return newPanelLayer || parentPanelLayer ? parentPanelLayer[0] : null;
};

const piwikMiddleware = (store) => (next) => (action) => {
  const nextAction = action;

  const state = store.getState();

  let event;
  let value;

  if (action.type) {
    if (action.type === SET_MAP_BASE_LAYER && action.payload) {
      const newBaseLayer = getMapBaseLayer(action.payload, state);

      event = newBaseLayer.category;
      value = newBaseLayer.label;
    }

    if (action.type === TOGGLE_MAP_OVERLAY && action.mapLayerId) {
      const newPanelLayer = getMapPanelLayer(action.mapLayerId, state);

      event = newPanelLayer.category;
      value = newPanelLayer.title;
    }

    // Information for piwik
    if (event && value) {
      piwikTracker([piwik.TRACK_EVENT, piwik[action.type],
        event, value]);
    }
  }

  return next(nextAction);
};

export default piwikMiddleware;
