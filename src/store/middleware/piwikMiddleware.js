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

/** Retrieve panelLayer information from the State */
const getPanelLayer = (panelLayerId, panelLayers) => {
  let panelLayer;

  panelLayer = panelLayers.find((b) => b.id === panelLayerId);

  // No panelLayer found, check legendItems for matching ID
  if (!panelLayer) {
    panelLayer = panelLayers.map((layer) => {
      const isParent = layer.legendItems.some((b) => (b.id === panelLayerId));

      return (!!isParent) && layer;
    }).filter(Boolean);
  }

  return Array.isArray(panelLayer) ? panelLayer[0] : panelLayer;
};

/** Match the PanelLayer from the Action to the State */
const getMapPanelLayer = (payload, { map, mapLayers }) => {
  const { panelLayers } = mapLayers;
  const { overlays: activePanelLayers } = map;
  const newPanelLayerId = payload;


  const newPanelLayer = getPanelLayer(newPanelLayerId, panelLayers.items);
  const isActive = activePanelLayers.some((b) =>
    getPanelLayer(b.id, panelLayers.items) === newPanelLayer
  );

  return (!isActive) ? newPanelLayer : null;
};

/** Execute Piwik actions */
const piwikMiddleware = (store) => (next) => (action) => {
  const nextAction = action;

  const state = store.getState();

  let event;
  let value;

  if (action.type) {
    if (action.type === SET_MAP_BASE_LAYER && action.payload) {
      const newBaseLayer = getMapBaseLayer(action.payload, state);

      if (newBaseLayer) {
        event = newBaseLayer.category;
        value = newBaseLayer.label;
      }
    }

    if (action.type === TOGGLE_MAP_OVERLAY && action.mapLayerId) {
      const newPanelLayer = getMapPanelLayer(action.mapLayerId, state);

      if (newPanelLayer) {
        event = newPanelLayer.category;
        value = newPanelLayer.title;
      }
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
