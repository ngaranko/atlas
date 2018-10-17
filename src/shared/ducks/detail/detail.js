import { createSelector } from 'reselect';
import { UPDATE_MAP } from '../../../map/ducks/map/map';
import { routing } from '../../../app/routes';

export const REDUCER_KEY = 'detail';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const SHOW_DETAIL = 'SHOW_DETAIL';
export const DETAIL_FULLSCREEN = 'DETAIL_FULLSCREEN';

export const DETAIL_VIEW = {
  MAP: 'MAP',
  MAP_DETAIL: 'MAP_DETAIL',
  DETAIL: 'DETAIL'
};

const initialState = null;

export default function detailReducer(state = initialState, action) {
  switch (action.type) {
    case routing.adresDetail.type: {
      const { query = {} } = action.meta;
      // console.log(action.meta);
      // console.log(query);
      // console.log('query.hasOwnProperty(\'kaart\')', query.hasOwnProperty('kaart'));
      if (query.hasOwnProperty('kaart')) {
        return {
          ...state,
          view: DETAIL_VIEW.MAP
        };
      }
      if (query.hasOwnProperty('detail')) {
        return {
          ...state,
          view: DETAIL_VIEW.DETAIL
        };
      }
      return {
        ...state,
        view: DETAIL_VIEW.MAP_DETAIL
      };
    }
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

export const getDetail = (state) => state[REDUCER_KEY];
export const getDetailGeometry = createSelector(getDetail, (detail) => detail && detail.geometry);
export const getDetailEndpoint = createSelector(getDetail, (detail) => detail && detail.endpoint);
export const getDetailDisplay = createSelector(getDetail, (detail) => detail && detail.display);
export const isDetailReloaded = createSelector(getDetail, (detail) => detail && detail.reload);
export const getDetailSkippedSearchResults = createSelector(
  getDetail,
  (detail) => detail && detail.skippedSearchResults
);
export const isDetailLoading = createSelector(getDetail, (detail) => detail && detail.isLoading);
