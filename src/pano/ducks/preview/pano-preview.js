export const FETCH_PANO_PREVIEW_REQUEST = 'FETCH_PANO_PREVIEW_REQUEST';
export const FETCH_PANO_PREVIEW_SUCCESS = 'FETCH_PANO_PREVIEW_SUCCESS';
export const FETCH_PANO_PREVIEW_FAILURE = 'FETCH_PANO_PREVIEW_FAILURE';

const initialState = {
  error: null,
  pano: {
    location: [],
    previews: {}
  }
};

export default function PanoPreviewReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PANO_PREVIEW_REQUEST:
      return {
        ...state,
        error: null,
        pano: {
          ...state.pano,
          location: action.location
        }
      };

    case FETCH_PANO_PREVIEW_SUCCESS:
      return {
        ...state,
        pano: {
          ...state.pano,
          location: [],
          previews: {
            ...state.pano.previews,
            [state.pano.location]: action.panoResult
          }
        }
      };

    case FETCH_PANO_PREVIEW_FAILURE:
      return { ...state, error: action.error };

    default:
      return state;
  }
}

export const getPanoPreview = (location) => ({
  type: FETCH_PANO_PREVIEW_REQUEST,
  location
});

window.reducers = window.reducers || {};
window.reducers.PanoPreviewReducer = PanoPreviewReducer;
