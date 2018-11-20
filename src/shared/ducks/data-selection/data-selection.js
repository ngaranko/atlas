import { routing } from '../../../app/routes';
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
} from './data-selection-constants';
import query from './data-selection-query';
import { getStateFromQuery } from '../../../store/query-synchronization';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case routing.addresses.type:
    case routing.establishments.type:
    case routing.cadastralObjects.type: {
      if (action.meta.query) {
        const stateFromQuery = getStateFromQuery(query, action.meta.query);
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
// Action creators
export const fetchDataSelection = (payload) => ({ type: FETCH_DATA_SELECTION_REQUEST, payload });
export const setMarkers = (payload) => ({ type: SET_MARKERS, payload });
export const setPage = (payload) => ({ type: SET_PAGE, payload });
export const setView = (payload) => ({ type: SET_VIEW, payload });
export const setDataset = (payload) => ({ type: SET_DATASET, payload });
export const setGeometryFilter = (payload) => ({ type: SET_GEOMETRY_FILTERS, payload });

export const receiveDataSelectionSuccess = (payload) => ({
  type: FETCH_DATA_SELECTION_SUCCESS,
  payload
});

export const receiveDataSelectionFailure = (error) => ({
  type: FETCH_DATA_SELECTION_FAILURE,
  payload: error
});

