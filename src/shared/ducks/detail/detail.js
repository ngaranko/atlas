import { UPDATE_MAP } from '../../../map/ducks/map/map';
import { routing } from '../../../app/routes';

export const REDUCER_KEY = 'detail';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const SHOW_DETAIL = 'SHOW_DETAIL';
export const DETAIL_FULLSCREEN = 'DETAIL_FULLSCREEN';

const initialState = null;

export default function detailReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DETAIL:
      return {
        ...state,
        endpoint: action.payload,
        reload: Boolean(state && state.endpoint === action.payload),
        isLoading: true,
        isFullscreen: action.payload && action.payload.includes('dcatd/datasets'),
        skippedSearchResults: Boolean(action.skippedSearchResults)
      };

    case SHOW_DETAIL:
      return {
        ...state,
        display: action.payload.display,
        geometry: action.payload.geometry,
        isLoading: false,
        reload: false
      };

    case DETAIL_FULLSCREEN:
      return {
        ...state,
        isFullscreen: action.payload
      };

    default:
      return state;
  }
}

export const toMapDetail = () => ({
  type: UPDATE_MAP,
  payload: {
    noRedirect: true,
    route: routing.detail.type
  }
});

export const setDetailEndpointRoute = (endpoint) => ({
  type: UPDATE_MAP,
  payload: {
    noRedirect: true,
    route: routing.map.type,
    query: {
      detailEndpoint: endpoint
    }
  }
});

export const fetchDetail = (endpoint) => ({
  type: FETCH_DETAIL,
  payload: endpoint
});
