import isObject from '../../shared/services/is-object';
import { FETCH_DETAIL } from '../../shared/ducks/detail/detail';
import { FETCH_DATA_SELECTION } from '../../header/ducks/search/search';
import {
  RESET_DATA_SELECTION,
  SET_DATA_SELECTION_VIEW,
  SHOW_DATA_SELECTION
} from '../../shared/ducks/data-selection/data-selection';

/* istanbul ignore next */
const legacyReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DETAIL: {
      return {
        ...state,
        // dataSelection: null,
        map: {
          ...state.map,
          isLoading: true
        }
        // page: {
        //   ...state.page,
        //   name: null,
        //   type: null
        // },
        // search: null
      };
    }
    // case SHOW_DETAIL:
    //   return {
    //     ...state,
    //     map: {
    //       ...state.map,
    //       isLoading: false
    //     }
    //   };

    case FETCH_DATA_SELECTION: {
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
        filters
        // page: isObject(state.page) ? {
        //   ...state.page,
        //   name: null
        // } : state.page,
        // search: null,
        // detail: null
      };
    }

    case SHOW_DATA_SELECTION:
    case RESET_DATA_SELECTION:
      return {
        ...state,
        map: isObject(state.map) ? {
          ...state.map,
          isLoading: false
        } : state.map
      };

    case SET_DATA_SELECTION_VIEW: {
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

    // case FETCH_SEARCH_RESULTS_BY_LOCATION:
    //   return {
    //     ...state,
    //     map: isObject(state.map) ? {
    //       ...state.map,
    //       geometry: []
    //     } : state.map,
    //     page: isObject(state.page) ? {
    //       ...state.page,
    //       name: null
    //     } : state.page,
    //     detail: null,
    //     dataSelection: null
    //   };
    //
    // case FETCH_SEARCH_RESULTS_BY_QUERY:
    //   return {
    //     ...state,
    //     page: isObject(state.page) ? {
    //       ...state.page,
    //       name: null,
    //       type: null
    //     } : state.page,
    //     // detail: null,
    //     // dataSelection: null
    //   };
    //
    // case SHOW_SEARCH_RESULTS:
    //   return {
    //     ...state,
    //     map: {
    //       ...state.map,
    //       isLoading: false
    //     }
    //   };

    default:
      return state;
  }
};

export default legacyReducer;
