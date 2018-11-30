import { FETCH_SEARCH_RESULTS_BY_LOCATION } from '../../../shared/ducks/data-search/constants';

export const OPEN_MAP_PREVIEW_PANEL = 'OPEN_MAP_PREVIEW_PANEL';
export const CLOSE_MAP_PREVIEW_PANEL = 'CLOSE_MAP_PREVIEW_PANEL';

const initialState = {};

export default function MapPreviewPanelReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MAP_PREVIEW_PANEL:
      return {
        ...state,
        isMapPreviewPanelVisible: true
      };

    case CLOSE_MAP_PREVIEW_PANEL:
      return {
        ...state,
        isMapPreviewPanelVisible: false
      };

    default:
      return state;
  }
}

// Selectors
export const closeMapPreviewPanel = () => ({ type: CLOSE_MAP_PREVIEW_PANEL });

// Action creators
export const fetchSearchResultsByLocation = (location) => ({
  type: FETCH_SEARCH_RESULTS_BY_LOCATION,
  payload: [location.latitude, location.longitude]
});
