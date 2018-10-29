import { createSelector } from 'reselect';
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

const initialState = {
  view: DETAIL_VIEW.MAP_DETAIL,
  isLoading: false
};

export default function detailReducer(state = initialState, action) {
  switch (action.type) {
    case routing.dataDetail.type: {
      const { id } = action.payload;
      const { query = {} } = action.meta;
      if (Object.prototype.hasOwnProperty.call(query, 'kaart')) {
        return {
          ...state,
          id,
          view: DETAIL_VIEW.MAP
        };
      }
      if (Object.prototype.hasOwnProperty.call(query, 'detail')) {
        return {
          ...state,
          id,
          view: DETAIL_VIEW.DETAIL
        };
      }
      return {
        ...state,
        id,
        view: DETAIL_VIEW.MAP_DETAIL
      };
    }
    case FETCH_DETAIL:
      return {
        ...state,
        endpoint: action.payload,
        isLoading: true,
        isFullscreen: action.payload && action.payload.includes('dcatd/datasets')
      };

    case SHOW_DETAIL:
      return {
        ...state,
        display: action.payload.display,
        geometry: action.payload.geometry,
        isLoading: false
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

// Action creators
export const fetchDetail = (endpoint) => ({
  type: FETCH_DETAIL,
  payload: endpoint
});

// Selectors
export const getDetail = (state) => state[REDUCER_KEY];
export const getDetailView = (state) => state.detail.view;
export const getDetailGeometry = createSelector(getDetail, (detail) => detail && detail.geometry);
export const getDetailEndpoint = createSelector(getDetail, (detail) => detail && detail.endpoint);
export const getDetailDisplay = createSelector(getDetail, (detail) => detail && detail.display);
export const isDetailReloaded = createSelector(getDetail, (detail) => detail && detail.reload);
export const isDetailLoading = createSelector(getDetail, (detail) => detail && detail.isLoading);
