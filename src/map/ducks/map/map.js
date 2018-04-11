import { createSelector } from 'reselect';

import { createUrlWithToken } from '../../../shared/services/api/api';
import BASE_LAYERS from '../../../shared/services/layers/base-layers.constant';
import ACTIONS from '../../../shared/actions';
import MAP_CONFIG from '../../services/map-config';

export const SET_MAP_BASE_LAYER = 'SET_MAP_BASE_LAYER';
export const MAP_CLEAR_DRAWING = 'MAP_CLEAR_DRAWING';
export const MAP_EMPTY_GEOMETRY = 'MAP_EMPTY_GEOMETRY';
export const MAP_UPDATE_SHAPE = 'MAP_UPDATE_SHAPE';
export const MAP_START_DRAWING = 'MAP_START_DRAWING';
export const MAP_END_DRAWING = 'MAP_END_DRAWING';

const initialState = {
  viewCenter: [52.3731081, 4.8932945],
  baseLayer: 'topografie',
  zoom: 11,
  overlays: [],
  isLoading: false,
  drawingMode: 'none',
  highlight: true,
  shapeMarkers: 0,
  shapeDistanceTxt: '',
  shapeAreaTxt: ''
};

let polygon = {};
let has2Markers;
let moreThan2Markers;

export default function MapReducer(state = initialState, action) {
  switch (action.type) {
    case MAP_CLEAR_DRAWING:
      return {
        ...state,
        geometry: []
      };

    case MAP_EMPTY_GEOMETRY:
      return {
        ...state,
        geometry: []
      };

    case MAP_UPDATE_SHAPE:
      return {
        ...state,
        shapeMarkers: action.payload.shapeMarkers,
        shapeDistanceTxt: action.payload.shapeDistanceTxt,
        shapeAreaTxt: action.payload.shapeAreaTxt
      };

    case MAP_START_DRAWING:
      return {
        ...state,
        drawingMode: action.payload.drawingMode
      };

    case MAP_END_DRAWING:
      polygon = action.payload && action.payload.polygon;
      has2Markers = polygon && polygon.markers && polygon.markers.length === 2;
      moreThan2Markers = polygon && polygon.markers && polygon.markers.length > 2;

      return {
        ...state,
        drawingMode: 'none',
        geometry: has2Markers ? polygon.markers : moreThan2Markers ? [] : state.geometry,
        isLoading: moreThan2Markers ? true : state.isLoading
      };

    case SET_MAP_BASE_LAYER:
      return {
        ...state,
        baseLayer: action.payload
      };

    default:
      return state;
  }
}

// HELPER METHODS
const findLayer = (layers, id) => layers.find((mapLayer) => mapLayer.id === id);
const getActiveBaselayer = (slug) => BASE_LAYERS.find((layer) => layer.slug === slug);
const generateLayer = (layers, overlay, url) => ({
  ...overlay,
  url,
  overlayOptions: {
    ...MAP_CONFIG.OVERLAY_OPTIONS,
    layers: findLayer(layers, overlay.id).layers
  }
});

// SELECTORS
export const getBaseLayer = (state, baseLayerOptions) => ({
  urlTemplate: getActiveBaselayer(state.map.baseLayer).urlTemplate,
  baseLayerOptions
});

const getMapLayers = (state) => state.mapLayers.layers.items;
const getOverlays = (state) => state.map.overlays;
const getAccessToken = (state) => state.user.accessToken;

export const getLayers = createSelector(
  [getOverlays, getAccessToken, getMapLayers],
  (overlays, token, layers) => (
    overlays.map((overlay) => {
      const layer = findLayer(layers, overlay.id);
      if (!layer) {
        return false;
      }
      const layerUrl = `${MAP_CONFIG.OVERLAY_ROOT}/${layer.url}`;
      if (!layer.authScope) {
        return generateLayer(layers, overlay, layerUrl);
      }
      if (token) {
        return generateLayer(
          layers,
          overlay,
          createUrlWithToken(layerUrl, token)
        );
      }
      return false;
    })
    .filter((layer) => layer))
);

export const mapClearDrawing = () => ({ type: MAP_CLEAR_DRAWING });
export const mapEmptyGeometry = () => ({ type: MAP_EMPTY_GEOMETRY });
export const mapUpdateShape = (payload) => ({ type: MAP_UPDATE_SHAPE, payload });
export const mapStartDrawing = (payload) => ({ type: MAP_START_DRAWING, payload });
export const mapEndDrawing = (payload) => ({ type: MAP_END_DRAWING, payload });
export const setMapBaseLayer = (payload) => ({ type: SET_MAP_BASE_LAYER, payload });
// old actions
export const updateZoom = (payload) => ({ type: ACTIONS.MAP_ZOOM, payload });
export const updatePan = (payload) =>
  ({ type: ACTIONS.MAP_PAN, payload: [payload.center.lat, payload.center.lng] });

window.reducers = window.reducers || {};
window.reducers.MapReducer = MapReducer;
