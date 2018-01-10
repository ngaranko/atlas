export const FETCH_PANO_PREVIEW_REQUEST = 'FETCH_PANO_PREVIEW_REQUEST';
export const FETCH_PANO_PREVIEW_SUCCESS = 'FETCH_PANO_PREVIEW_SUCCESS';
export const FETCH_PANO_PREVIEW_FAILURE = 'FETCH_PANO_PREVIEW_FAILURE';

const initialState = {
  panoError: null,
  pano: {
    location: {},
    previews: {}
  }
};

export default function PanoPreviewReducer(state = initialState, action) {
  const locationId = Object
    .keys(state.pano.location)
    .map((key) => state.pano.location[key])
    .toString();

  switch (action.type) {
    case FETCH_PANO_PREVIEW_REQUEST:
      return {
        ...state,
        panoError: null,
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
          previews: {
            ...state.pano.previews,
            [locationId]: action.panoResult
          }
        }
      };

    case FETCH_PANO_PREVIEW_FAILURE:
      return { ...state, panoError: action.error };

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
