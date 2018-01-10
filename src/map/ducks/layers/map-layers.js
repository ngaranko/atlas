export const FETCH_MAP_LAYERS_REQUEST = 'FETCH_MAP_LAYERS_REQUEST';
export const FETCH_MAP_LAYERS_SUCCESS = 'FETCH_MAP_LAYERS_SUCCESS';
export const FETCH_MAP_LAYERS_FAILURE = 'FETCH_MAP_LAYERS_FAILURE';

const initialState = {
  mapLayers: null,
  isLoading: false,
  mapLayersError: null
};

export default function MapLayersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_LAYERS_REQUEST:
      return { ...state, isLoading: true, mapLayersError: null };

    case FETCH_MAP_LAYERS_SUCCESS:
      return { ...state, isLoading: false, mapLayers: action.mapLayers };

    case FETCH_MAP_LAYERS_FAILURE:
      return { ...state, isLoading: false, mapLayersError: action.error };

    default:
      return state;
  }
}

export const getMapLayers = () => ({ type: FETCH_MAP_LAYERS_REQUEST });

export const selectActiveMapLayers = (state) => {
  const mapLayerIds = state.map.overlays.map((mapLayer) => mapLayer.id);
  return state.mapLayers
    .filter((mapLayer) => (
      [
        mapLayer.id,
        ...mapLayer.legendItems.map((legendItem) => legendItem.id)
      ]
      .filter((mapLayerId) => Boolean(mapLayerId))
      .some((mapLayerId) => state.map.overlays
        .map((overlay) => overlay.id)
        .includes(mapLayerId))
    ))
    .sort((a, b) => {
      const aId = a.id || a.legendItems[0].id;
      const bId = b.id || b.legendItems[0].id;
      return mapLayerIds.indexOf(aId) < mapLayerIds.indexOf(bId);
    });
};

export const selectNotClickableVisibleMapLayers = (state) => {
  const zoomLevel = state.map.zoom;

  return selectActiveMapLayers(state)
    .filter((mapLayer) => (zoomLevel >= mapLayer.minZoom && zoomLevel <= mapLayer.maxZoom))
    .map((mapLayer) => [mapLayer, ...mapLayer.legendItems])
    .reduce((accumulator, legendItems) => accumulator.concat(legendItems), [])
    .filter((legendItem) => legendItem.notClickable)
    .filter((legendItem) => state.map.overlays
      .some((overlay) => overlay.id === legendItem.id && overlay.isVisible));
};

window.reducers = window.reducers || {};
window.reducers.MapLayersReducer = MapLayersReducer;
