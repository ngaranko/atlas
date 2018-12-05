import {
  FETCH_DATA_SELECTION_FAILURE,
  FETCH_DATA_SELECTION_REQUEST,
  FETCH_DATA_SELECTION_SUCCESS,
  initialState,
  ROUTE_DATASET_MAPPER,
  SET_DATASET,
  SET_GEOMETRY_FILTERS,
  SET_MARKERS,
  SET_PAGE,
  SET_VIEW,
  VIEWS
} from './constants';
import { routing } from '../../../app/routes';
import { getStateFromQuery } from '../../../store/query-synchronization';
import query from './query';
import { SET_SELECTION } from '../selection/selection';

export { REDUCER_KEY } from './constants';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case routing.addresses.type:
    case routing.establishments.type:
    case routing.cadastralObjects.type: {
      if (action.meta && action.meta.query) {
        const stateFromQuery = getStateFromQuery(query, action);
        return {
          ...state,
          ...stateFromQuery,
          dataset: ROUTE_DATASET_MAPPER[action.type]
        };
      }
      return {
        ...state,
        dataset: ROUTE_DATASET_MAPPER[action.type],
        view: VIEWS.TABLE
      };
    }

    case routing.home.type:
    case SET_SELECTION: {
      return {
        ...initialState
      };
    }

    case FETCH_DATA_SELECTION_REQUEST:
      return {
        ...state,
        isLoading: true,
        markers: []
      };

    case FETCH_DATA_SELECTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        markers: [],
        errorMessage: '',
        authError: false,
        ...action.payload
      };
    }

    case FETCH_DATA_SELECTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        authError: (action.payload.error === 'Unauthorized'),
        errorMessage: action.payload.error,
        dataset: action.payload.dataset,
        results: {},
        markers: []
      };

    case SET_MARKERS:
      return {
        ...state,
        isLoading: false,
        markers: action.payload
      };

    case SET_DATASET:
      return {
        ...state,
        dataset: action.payload
      };

    case SET_GEOMETRY_FILTERS:
      return {
        ...state,
        geometryFilter: action.payload
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };

    case SET_VIEW:
      return {
        ...state,
        view: action.payload
      };

    default:
      return state;
  }
}
