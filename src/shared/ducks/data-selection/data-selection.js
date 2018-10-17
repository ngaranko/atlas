import ACTIONS from '../../actions';
import isObject from '../../services/is-object';
import { FETCH_DATA_SELECTION } from '../../../header/ducks/search/search';

export const SET_DATA_SELECTION_GEOMETRY_FILTER = 'SET_DATA_SELECTION_GEOMETRY_FILTER';
export const RESET_DATA_SELECTION_GEOMETRY_FILTER = 'RESET_DATA_SELECTION_GEOMETRY_FILTER';

const initialState = {
  markers: [], // eg: [[52.1, 4.1], [52.2, 4.0]],
  geometryFilter: {
    markers: []
  },
  isLoading: true
  // page: 1,
  // isFullscreen: true,
};

const VIEWS = {
  LIST: 'LIST',
  TABLE: 'TABLE',
  CATALOG: 'CATALOG'
};

let geometryFilter = {};

export default function DataSelectionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_SELECTION: {
      const mergeInto = typeof payload === 'string' ? {
        query: action.payload,
        page: 1,
        view: VIEWS.CATALOG,
        dataset: 'dcatd'
      } : action.payload;

      const view = mergeInto.view || (state && state.view) || VIEWS.TABLE;

      const emptyGeometryFilters = {
        markers: [],
        description: ''
      };

      const geoFilter = mergeInto.resetGeometryFilter ? emptyGeometryFilters :
        (state && state.geometryFilter) || emptyGeometryFilters;

      delete mergeInto.resetGeometryFilter;
      delete mergeInto.emptyFilters;
      delete mergeInto.filters;

      return {
        ...state,
        ...mergeInto,
        markers: [],
        view,
        isLoading: true,
        isFullscreen: view !== VIEWS.LIST,
        geometryFilter: { ...geoFilter }
      };
    }

    case ACTIONS.SHOW_DATA_SELECTION:
      return !isObject(state) ? state : {
        ...state,
        markers: action.payload,
        isLoading: false,
        isFullscreen: state.view !== VIEWS.LIST
      };

    case ACTIONS.RESET_DATA_SELECTION:
      return !isObject(state) ? state : {
        ...state,
        markers: action.payload,
        isLoading: false,
        isFullscreen: state.view !== VIEWS.LIST,
        reset: false
      };

    case ACTIONS.NAVIGATE_DATA_SELECTION:
      return !isObject(state) ? state : {
        ...state,
        page: action.payload
      };

    case ACTIONS.SET_DATA_SELECTION_VIEW: {
      const views = [VIEWS.LIST, VIEWS.TABLE, VIEWS.CATALOG];
      const viewFound = views.includes(action.payload);
      const view = viewFound ? action.payload : undefined;

      return !isObject(state) ? state : {
        ...state,
        view,
        isLoading: viewFound
      };
    }

    case SET_DATA_SELECTION_GEOMETRY_FILTER:
      // Todo: posible bug: if action.payload is undefined, geometryFilter = {}
      geometryFilter = { ...action.payload } || { markers: [] };
      return {
        ...state,
        geometryFilter,
        page: 1,
        isFullscreen: false,
        isLoading: true,
        // No markers, the data selection goes back to its default state of
        // showing all data => make sure it will not trigger a url state
        // change
        reset: geometryFilter.markers.length === 0
      };

    case RESET_DATA_SELECTION_GEOMETRY_FILTER:
      geometryFilter = action.payload.polygon || { markers: [] };
      if ((action.payload.drawingMode !== 'edit') &&
        state &&
        state.geometryFilter &&
        state.geometryFilter.markers &&
        state.geometryFilter.markers.length > 0) {
        return {
          ...state,
          geometryFilter,
          page: 1,
          isFullscreen: false,
          isLoading: true,
          markers: [],
          // No markers, the data selection goes back to its default state of
          // showing all data => make sure it will not trigger a url state
          // change
          reset: geometryFilter.markers.length === 0
        };
      }
      return state;

    default:
      return state;
  }
}

export const setDataSelectionGeometryFilter = (payload) =>
  ({ type: SET_DATA_SELECTION_GEOMETRY_FILTER, payload });
export const resetDataSelectionGeometryFilter = (payload) =>
  ({ type: RESET_DATA_SELECTION_GEOMETRY_FILTER, payload });
