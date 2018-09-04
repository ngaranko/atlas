export const FETCH_PANO_PREVIEW_REQUEST = 'FETCH_PANO_PREVIEW_REQUEST';
export const FETCH_PANO_PREVIEW_SUCCESS = 'FETCH_PANO_PREVIEW_SUCCESS';
export const FETCH_PANO_PREVIEW_FAILURE = 'FETCH_PANO_PREVIEW_FAILURE';

const initialState = {
  error: null,
  location: {},
  previews: {}
};

export default function PanoPreviewReducer(state = initialState, action) {
  const locationId = Object
    .keys(state.location)
    .map((key) => state.location[key])
    .toString();

  switch (action.type) {
    case FETCH_PANO_PREVIEW_REQUEST:
      return {
        ...state,
        error: null,
        location: action.location
      };

    case FETCH_PANO_PREVIEW_SUCCESS:
      return {
        ...state,
        previews: {
          ...state.previews,
          [locationId]: action.panoResult
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
