import { createSelector } from 'reselect';
import { routing } from '../../../app/routes';
import { pageTypeToEndpoint } from '../../../store/redux-first-router';
import { FETCH_MAP_DETAIL_SUCCESS } from '../../../map/ducks/detail/constants';

export const REDUCER_KEY = 'detail';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const SHOW_DETAIL = 'SHOW_DETAIL';

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
      const { id: idString, type, subtype } = action.payload;
      const id = idString.substr(2); // Change `id123` to `123`
      const { query = {} } = action.meta;
      if (Object.prototype.hasOwnProperty.call(query, 'kaart')) {
        return {
          ...state,
          id,
          type,
          subtype,
          view: DETAIL_VIEW.MAP
        };
      }
      if (Object.prototype.hasOwnProperty.call(query, 'detail')) {
        return {
          ...state,
          id,
          type,
          subtype,
          view: DETAIL_VIEW.DETAIL
        };
      }
      return {
        ...state,
        id,
        type,
        subtype,
        view: DETAIL_VIEW.MAP_DETAIL
      };
    }
    case FETCH_DETAIL:
      return {
        ...state,
        display: undefined,
        geometry: undefined,
        isLoading: true
      };

    case SHOW_DETAIL:
      return {
        ...state,
        display: action.payload.display,
        geometry: action.payload.geometry,
        isLoading: false
      };

    case FETCH_MAP_DETAIL_SUCCESS:
      return {
        ...state,
        geometry: action.mapDetail.geometrie
      };

    default:
      return state;
  }
}

// Action creators
export const fetchDetail = (payload) => ({
  type: FETCH_DETAIL,
  payload
});

// Selectors
export const getDetail = (state) => state[REDUCER_KEY];
export const getDetailView = (state) => state.detail.view;
export const getDetailGeometry = createSelector(getDetail, (detail) => detail && detail.geometry);
export const getDetailEndpoint = createSelector(getDetail, (detail) => {
  if (detail && detail.type && detail.subtype && detail.id) {
    return pageTypeToEndpoint(detail.type, detail.subtype, detail.id);
  }
  return undefined;
});
export const getDetailDisplay = createSelector(getDetail, (detail) => detail && detail.display);
export const isDetailLoading = createSelector(getDetail, (detail) => detail && detail.isLoading);
