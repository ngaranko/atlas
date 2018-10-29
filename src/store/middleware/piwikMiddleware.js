import piwikTracker from '../../shared/services/piwik-tracker/piwik-tracker';
import { SET_MAP_BASE_LAYER, TOGGLE_MAP_OVERLAY } from '../../map/ducks/map/map';

const piwik = {
  TRACK_EVENT: 'trackEvent',
  SET_MAP_BASE_LAYER: 'achtergrond',
  TOGGLE_MAP_OVERLAY: 'kaartlaag'
};

const piwikMiddleware = (store) => (next) => (action) => {
  const nextAction = action;

  const { map, mapLayers } = store.getState();

  if (action.type) {
    if (action.type === SET_MAP_BASE_LAYER && action.payload) {
      const { baseLayers } = mapLayers;
      const newBaseLayerId = action.payload;

      // Check if layer isn't already activated
      if (newBaseLayerId !== map.baseLayer) {
        // Get layer info from the store
        const newBaseLayer = baseLayers.items.find((b) => b.value === newBaseLayerId);

        // Information for piwik
        piwikTracker([piwik.TRACK_EVENT, piwik[action.type],
          newBaseLayer.category, newBaseLayer.label]);
      }
    }

    if (action.type === TOGGLE_MAP_OVERLAY && action.mapLayerId) {
      const { panelLayers } = mapLayers;
      const { overlays: activePanelLayers } = map;
      const newPanelLayerId = action.mapLayerId;

      // Check if layer isn't already activated
      if (!activePanelLayers.filter((b) => b.id === newPanelLayerId).length) {
        // Get layer info from the store
        const newPanelLayer = panelLayers.items.find((b) => b.id === newPanelLayerId);

        // Look through legendItems if not found
        // Return object with info about parentPanelLayer
        const parentPanelLayer = (!newPanelLayer) ? panelLayers.items.map(
            (panelLayer) => (panelLayer.legendItems.filter(
              (b) => b.id === newPanelLayerId)).length && panelLayer
          ).filter((obj) => obj) : false;

        const activePanelLayer = newPanelLayer || parentPanelLayer ? parentPanelLayer[0] : null;

        // Information for piwik
        piwikTracker([piwik.TRACK_EVENT, piwik[action.type],
          activePanelLayer.category, activePanelLayer.title]);
      }
    }
  }

  return next(nextAction);
};

export default piwikMiddleware;
