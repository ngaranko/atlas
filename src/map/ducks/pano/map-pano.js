export const FETCH_MAP_PANO_REQUEST = 'FETCH_MAP_PANO_REQUEST';
export const FETCH_MAP_PANO_SUCCESS = 'FETCH_MAP_PANO_SUCCESS';
export const FETCH_MAP_PANO_FAILURE = 'FETCH_MAP_PANO_FAILURE';

const initialState = {
  mapPano: null,
  isLoading: false,
  error: null
};

export default function MapPanoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_PANO_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_MAP_PANO_SUCCESS:
      return { ...state, isLoading: false, mapPano: action.panoResult };

    case FETCH_MAP_PANO_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}

export const getMapPano = (location) => ({
  type: FETCH_MAP_PANO_REQUEST,
  location
});

window.reducers = window.reducers || {};
window.reducers.MapPanoReducer = MapPanoReducer;
