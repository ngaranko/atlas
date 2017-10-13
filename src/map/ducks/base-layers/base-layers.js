export const FETCH_BASE_LAYERS_REQUEST = 'FETCH_BASE_LAYERS_REQUEST';
export const FETCH_BASE_LAYERS_SUCCESS = 'FETCH_BASE_LAYERS_SUCCESS';
export const FETCH_BASE_LAYERS_FAILURE = 'FETCH_BASE_LAYERS_FAILURE';

const initialState = {
  baseLayers: null,
  isLoading: false,
  error: null
};

export default function BaseLayersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BASE_LAYERS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_BASE_LAYERS_SUCCESS:
      return { ...state, isLoading: false, baseLayers: action.baseLayers };

    case FETCH_BASE_LAYERS_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}

export const getBaseLayers = () => ({ type: FETCH_BASE_LAYERS_REQUEST });

window.BaseLayersReducer = BaseLayersReducer;
