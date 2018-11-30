import {
  FETCH_MAP_SEARCH_RESULTS_FAILURE,
  FETCH_MAP_SEARCH_RESULTS_REQUEST,
  FETCH_MAP_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_BY_LOCATION,
  FETCH_SEARCH_RESULTS_BY_QUERY,
  FETCH_SEARCH_RESULTS_CATEGORY,
  initialState,
  REDUCER_KEY,
  SHOW_SEARCH_RESULTS
} from './constants';
import isObject from '../../services/is-object';
import { getStateFromQuery } from '../../../store/query-synchronization';
import query from './query';

export { REDUCER_KEY };

export default function reducer(state = initialState, action) {
  const enrichedState = {
    ...state,
    ...getStateFromQuery(query, action)
  };

  switch (action.type) {
    case FETCH_SEARCH_RESULTS_CATEGORY:
      return isObject(enrichedState) ? {
        ...enrichedState,
        isLoading: true,
        category: action.payload,
        numberOfResults: null
      } : enrichedState;

    case FETCH_SEARCH_RESULTS_BY_LOCATION:
      return {
        isLoading: true,
        query: null,
        location: action.payload,
        category: null,
        numberOfResults: null
      };

    case FETCH_SEARCH_RESULTS_BY_QUERY:
      return {
        isLoading: true,
        query: action.payload,
        location: null,
        category: null,
        numberOfResults: null
      };

    case SHOW_SEARCH_RESULTS:
      return {
        ...enrichedState,
        isLoading: false,
        numberOfResults: action.payload
      };

    case FETCH_MAP_SEARCH_RESULTS_REQUEST:
      return {
        ...enrichedState,
        isLoading: true,
        geoSearch: action.payload
      };

    case FETCH_MAP_SEARCH_RESULTS_SUCCESS: {
      return {
        ...enrichedState,
        isLoading: false,
        mapSearchResultsByLocation: action.payload
      };
    }

    case FETCH_MAP_SEARCH_RESULTS_FAILURE:
      return {
        ...enrichedState,
        isLoading: false,
        error: action.payload
      };

    default:
      return enrichedState;
  }
}
