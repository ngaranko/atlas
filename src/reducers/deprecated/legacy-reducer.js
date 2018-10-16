import ACTIONS from '../../shared/actions';
import isObject from '../../shared/services/is-object';
import { isMapCurrentPage } from '../../shared/ducks/current-page/current-page-reducer';
import { routing } from '../../app/routes';
import { FETCH_DETAIL, SHOW_DETAIL } from '../../shared/ducks/detail/detail';
import {
  FETCH_SEARCH_RESULTS_BY_LOCATION,
  FETCH_SEARCH_RESULTS_BY_QUERY,
  SHOW_SEARCH_RESULTS
} from '../../shared/ducks/search/search';

/* istanbul ignore next */
const legacyReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DETAIL: {
      return {
        ...state,
        dataSelection: null,
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
        map: {
          ...state.map,
          isLoading: false
        }
      };

    case ACTIONS.FETCH_STRAATBEELD_BY_LOCATION: {
      const map = isObject(state.map) ? { ...state.map } : state.map;

      if (isMapCurrentPage(state)) {
        map.viewCenter = action.payload;
      }

      return {
        ...state,
        map: {
          ...map
        },
        page: isObject(state.page) ? {
          ...state.page,
          name: null
        } : state.page,
        search: null,
        dataSelection: null,
        detail: null
      };
    }

    case ACTIONS.FETCH_STRAATBEELD_BY_ID:
    case ACTIONS.FETCH_STRAATBEELD_BY_HOTSPOT:
      return {
        ...state,
        search: null,
        dataSelection: null
      };

    case ACTIONS.FETCH_DATA_SELECTION: {
      const mergeInto = typeof payload === 'string' ? {
        query: action.payload,
        page: 1,
        view: 'CATALOG',
        dataset: 'dcatd'
      } : action.payload;

      const view = mergeInto.view || (state.dataSelection && state.dataSelection.view) || 'TABLE';

      const filters = mergeInto.filters
        ? mergeInto.filters
        : (mergeInto.emptyFilters
          ? {}
          : { ...state.filters });

      return {
        ...state,
        map: isObject(state.map) ? {
          ...state.map,
          // LIST loading might include markers => set map loading accordingly
          isLoading: view === 'LIST'
        } : state.map,
        filters,
        page: isObject(state.page) ? {
          ...state.page,
          name: null
        } : state.page,
        search: null,
        detail: null,
        straatbeeld: null
      };
    }

    case ACTIONS.SHOW_DATA_SELECTION:
    case ACTIONS.RESET_DATA_SELECTION:
      return {
        ...state,
        map: isObject(state.map) ? {
          ...state.map,
          isLoading: false
        } : state.map
      };

    case ACTIONS.SET_DATA_SELECTION_VIEW: {
      const views = ['LIST', 'TABLE', 'CATALOG'];
      const viewFound = views.indexOf(action.payload) !== -1;
      const view = viewFound ? action.payload : undefined;

      return {
        ...state,
        map: isObject(state.map) ? {
          ...state.map,
          isLoading: view === 'LIST'
        } : state.map
      };
    }

    case FETCH_SEARCH_RESULTS_BY_LOCATION:
      return {
        ...state,
        map: isObject(state.map) ? {
          ...state.map,
          geometry: []
        } : state.map,
        page: isObject(state.page) ? {
          ...state.page,
          name: null
        } : state.page,
        detail: null,
        straatbeeld: null,
        dataSelection: null
      };

    case FETCH_SEARCH_RESULTS_BY_QUERY:
      return {
        ...state,
        page: isObject(state.page) ? {
          ...state.page,
          name: null,
          type: null
        } : state.page,
        detail: null,
        straatbeeld: null,
        dataSelection: null
      };

    case SHOW_SEARCH_RESULTS:
      return {
        ...state,
        map: {
          ...state.map,
          isLoading: false
        }
      };

    default:
      return state;
  }
};

export default legacyReducer;
