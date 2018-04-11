export const FETCH_MAP_BASE_LAYERS_REQUEST = 'FETCH_MAP_BASE_LAYERS_REQUEST';
export const FETCH_MAP_BASE_LAYERS_SUCCESS = 'FETCH_MAP_BASE_LAYERS_SUCCESS';
export const FETCH_MAP_BASE_LAYERS_FAILURE = 'FETCH_MAP_BASE_LAYERS_FAILURE';

const initialState = {
  items: {
    typography: [],
    aerial: []
  },
  isLoading: false,
  error: null
};

export default function MapBaseLayersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_BASE_LAYERS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_MAP_BASE_LAYERS_SUCCESS:
      return { ...state, isLoading: false, items: action.mapBaseLayers };

    case FETCH_MAP_BASE_LAYERS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}

export const getMapBaseLayers = () => ({ type: FETCH_MAP_BASE_LAYERS_REQUEST });

window.reducers = window.reducers || {};
window.reducers.MapBaseLayersReducer = MapBaseLayersReducer;
