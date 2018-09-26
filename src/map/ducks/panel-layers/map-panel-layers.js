import { createSelector } from 'reselect';

import { getMapZoom, getMapOverlays } from '../map/map';

export const FETCH_PANEL_ITEMS_REQUEST = 'FETCH_PANEL_ITEMS_REQUEST';
export const FETCH_PANEL_ITEMS_SUCCESS = 'FETCH_PANEL_ITEMS_SUCCESS';
export const FETCH_PANEL_ITEMS_FAILURE = 'FETCH_PANEL_ITEMS_FAILURE';

const initialState = {
  items: [],
  isLoading: false,
  error: null
};

const getPanelLayers = (state) => state.mapLayers.panelLayers;

export const getMapPanelLayers = createSelector(getPanelLayers,
  (panelLayers) => panelLayers.items || []);

export const selectActivePanelLayers =
  createSelector([getMapPanelLayers, getMapOverlays],
    (panelLayers, overlays) => {
      const mapLayerIds = overlays.map((mapLayer) => mapLayer.id);
      return panelLayers
        .filter((mapLayer) => (
          [
            mapLayer.id,
            ...mapLayer.legendItems.map((legendItem) => legendItem.id)
          ]
          .filter((mapLayerId) => Boolean(mapLayerId))
          .some((mapLayerId) => overlays
            .map((overlay) => overlay.id)
            .includes(mapLayerId))
        ))
        .sort((a, b) => {
          const aId = a.id || a.legendItems[0].id;
          const bId = b.id || b.legendItems[0].id;
          return mapLayerIds.indexOf(bId) - mapLayerIds.indexOf(aId);
        });
    });

export const getActiveMapLayersWithinZoom = createSelector([getMapZoom, selectActivePanelLayers],
 (zoomLevel, activePanelLayers) => activePanelLayers
 .filter((mapLayer) => (zoomLevel >= mapLayer.minZoom && zoomLevel <= mapLayer.maxZoom))
);

export const selectNotClickableVisibleMapLayers =
  createSelector([getActiveMapLayersWithinZoom, getMapOverlays],
  (activePanelLayers, overlays) => (
    activePanelLayers
    .map((mapLayer) => [mapLayer, ...mapLayer.legendItems])
    .reduce((accumulator, legendItems) => accumulator.concat(legendItems), [])
    .filter((legendItem) => legendItem.notClickable)
    .filter((legendItem) => overlays
      .some((overlay) => overlay.id === legendItem.id && overlay.isVisible))
  )
);


export default function PanelLayersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PANEL_ITEMS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_PANEL_ITEMS_SUCCESS:
      return { ...state, isLoading: false, items: action.panelLayers };

    case FETCH_PANEL_ITEMS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}

export const fetchPanelLayers = (panelLayers) => ({ type: FETCH_PANEL_ITEMS_REQUEST, panelLayers });
