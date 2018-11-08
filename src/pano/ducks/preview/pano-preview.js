export const FETCH_PANO_PREVIEW_REQUEST = 'FETCH_PANO_PREVIEW_REQUEST';
const FETCH_PANO_PREVIEW_SUCCESS = 'FETCH_PANO_PREVIEW_SUCCESS';
const FETCH_PANO_PREVIEW_FAILURE = 'FETCH_PANO_PREVIEW_FAILURE';

export const REDUCER_KEY = 'pano';

const initialState = {
  isLoading: false,
  error: undefined,
  preview: undefined
};

export default function PanoPreviewReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PANO_PREVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: undefined,
        preview: undefined
      };

    case FETCH_PANO_PREVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        preview: action.payload
      };

    case FETCH_PANO_PREVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
}

// action creators
export const fetchPanoPreview = (location) => ({
  type: FETCH_PANO_PREVIEW_REQUEST,
  payload: location
});

export const fetchPanoPreviewSuccess = (payload) => ({
  type: FETCH_PANO_PREVIEW_SUCCESS,
  payload
});

export const fetchPanoPreviewFailure = (error) => ({
  type: FETCH_PANO_PREVIEW_FAILURE,
  payload: error
});

// selectors
export const getPanoPreview = (state) => state[REDUCER_KEY].preview;
export const isPanoPreviewLoading = (state) => state[REDUCER_KEY].isLoading;
