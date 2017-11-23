export const FETCH_MAP_BASE_LAYERS_REQUEST = 'FETCH_MAP_BASE_LAYERS_REQUEST';
export const FETCH_MAP_BASE_LAYERS_SUCCESS = 'FETCH_MAP_BASE_LAYERS_SUCCESS';
export const FETCH_MAP_BASE_LAYERS_FAILURE = 'FETCH_MAP_BASE_LAYERS_FAILURE';
export const SET_MAP_BASE_LAYER = 'SET_MAP_BASE_LAYER';

const initialState = {
  baseLayers: null,
  isLoading: false,
  error: null
};

export default function MapBaseLayersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_BASE_LAYERS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_MAP_BASE_LAYERS_SUCCESS:
      return { ...state, isLoading: false, mapBaseLayers: action.mapBaseLayers };

    case FETCH_MAP_BASE_LAYERS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case SET_MAP_BASE_LAYER:
      return {
        ...state,
        map: {
          ...state.map,
          baseLayer: action.mapBaseLayerId
        }
      };

    default:
      return state;
  }
}

export const getMapBaseLayers = () => ({ type: FETCH_MAP_BASE_LAYERS_REQUEST });
export const setMapBaseLayer = (mapBaseLayerId) => ({ type: SET_MAP_BASE_LAYER, mapBaseLayerId });

window.reducers = window.reducers || {};
window.reducers.MapBaseLayersReducer = MapBaseLayersReducer;
