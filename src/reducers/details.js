import { UPDATE_MAP } from '../map/ducks/map/map';
import { routing } from '../app/routes';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const SHOW_DETAIL = 'SHOW_DETAIL';
export const DETAIL_FULLSCREEN = 'DETAIL_FULLSCREEN';

/* istanbul ignore next */
const detailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DETAIL: {
      return {
        ...state,
        dataSelection: null,
        detail: {
          endpoint: action.payload,
          reload: Boolean(state.detail && state.detail.endpoint === action.payload),
          isLoading: true,
          isFullscreen: action.payload && action.payload.includes('dcatd/datasets'),
          skippedSearchResults: Boolean(action.skippedSearchResults)
        },
        map: {
          ...state.map,
          isLoading: true
        },
        page: {
          ...state.page,
          name: null,
          type: null
        },
        search: null,
        straatbeeld: null
      };
    }
    case SHOW_DETAIL:
      return {
        ...state,
        detail: {
          ...state.detail,
          display: action.payload.display,
          geometry: action.payload.geometry,
          isLoading: false,
          reload: false
        },
        map: {
          ...state.map,
          isLoading: false
        }
      };

    case DETAIL_FULLSCREEN:
      return {
        ...state,
        detail: {
          ...state.detail,
          isFullscreen: action.payload
        }
      };

    default:
      return state;
  }
};

export default detailReducer;

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

