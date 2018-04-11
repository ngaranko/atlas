export const FETCH_LEGENDA_ITEMS_REQUEST = 'FETCH_LEGENDA_ITEMS_REQUEST';
export const FETCH_LEGENDA_ITEMS_SUCCESS = 'FETCH_LEGENDA_ITEMS_SUCCESS';
export const FETCH_LEGENDA_ITEMS_FAILURE = 'FETCH_LEGENDA_ITEMS_FAILURE';

const initialState = {
  items: [],
  isLoading: false,
  legendaItemsError: null
};

export default function PanelLayersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEGENDA_ITEMS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_LEGENDA_ITEMS_SUCCESS:
      return { ...state, isLoading: false, items: action.panelLayers };

    case FETCH_LEGENDA_ITEMS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}

export const getPanelLayers = (mapLayers) => ({ type: FETCH_LEGENDA_ITEMS_REQUEST, mapLayers });

export const selectActivePanelLayers = (state) => {
  const mapLayerIds = state.map.overlays.map((mapLayer) => mapLayer.id);
  const mapLayers = state.mapLayers.layers.items;
  const panelLayers = state.mapLayers.panelLayers.items.map((layer) => {
    const matchingMapLayer = mapLayers.find((mapLayer) => (
      mapLayer.id === layer.id ||
        layer.legendItems.some((legentItem) => legentItem.id === mapLayer.id)
    ));
    const newLayer = {
      url: matchingMapLayer.url,
      minZoom: matchingMapLayer.minZoom,
      maxZoom: matchingMapLayer.minZoom,
      ...layer
    };
    return newLayer;
  });
  return panelLayers
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

  return selectActivePanelLayers(state)
    .filter((mapLayer) => (zoomLevel >= mapLayer.minZoom && zoomLevel <= mapLayer.maxZoom))
    .map((mapLayer) => [mapLayer, ...mapLayer.legendItems])
    .reduce((accumulator, legendItems) => accumulator.concat(legendItems), [])
    .filter((legendItem) => legendItem.notClickable)
    .filter((legendItem) => state.map.overlays
      .some((overlay) => overlay.id === legendItem.id && overlay.isVisible));
};

window.reducers = window.reducers || {};
window.reducers.PanelLayersReducer = PanelLayersReducer;
