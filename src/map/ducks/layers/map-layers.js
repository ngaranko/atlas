export const FETCH_MAP_LAYERS_REQUEST = 'FETCH_MAP_LAYERS_REQUEST';
export const FETCH_MAP_LAYERS_SUCCESS = 'FETCH_MAP_LAYERS_SUCCESS';
export const FETCH_MAP_LAYERS_FAILURE = 'FETCH_MAP_LAYERS_FAILURE';

const initialState = {
  mapLayers: null,
  isLoading: false,
  error: null
};

export default function MapLayersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_LAYERS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_MAP_LAYERS_SUCCESS:
      return { ...state, isLoading: false, mapLayers: action.mapLayers };

    case FETCH_MAP_LAYERS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}

export function addMapLayer() {
  return {
    type: {
      id: 'MAP_ADD_OVERLAY',
      replace: true
    },
    payload: 'ksec'
  };
}

export const getMapLayers = () => ({ type: FETCH_MAP_LAYERS_REQUEST });
