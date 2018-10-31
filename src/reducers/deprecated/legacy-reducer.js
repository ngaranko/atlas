import isObject from '../../shared/services/is-object';
import { FETCH_DETAIL } from '../../shared/ducks/detail/detail';
import { FETCH_DATA_SELECTION } from '../../header/ducks/search/search';

/* istanbul ignore next */
const legacyReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DETAIL: {
      return {
        ...state,
        map: {
          ...state.map,
          isLoading: true
        }
      };
    }
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
      };
    }
    default:
      return state;
  }
};

export default legacyReducer;
