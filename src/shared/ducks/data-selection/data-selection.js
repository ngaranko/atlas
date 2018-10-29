import { createSelector } from 'reselect';
import { detailPointType } from '../../../map/components/leaflet/services/icons.constant';
import { toAddressResults } from '../../../app/routes';

export const REDUCER_KEY = 'dataSelection';
export const FETCH_DATA_SELECTION_REQUEST = `${REDUCER_KEY}/FETCH_DATA_SELECTION_REQUEST`;
export const FETCH_DATA_SELECTION_SUCCESS = `${REDUCER_KEY}/FETCH_DATA_SELECTION_SUCCESS`;
export const FETCH_DATA_SELECTION_FAILURE = `${REDUCER_KEY}/FETCH_DATA_SELECTION_FAILURE`;
export const CLEAR_STATE = `${REDUCER_KEY}/CLEAR_STATE`;
const SET_MARKERS = `${REDUCER_KEY}/SET_MARKERS`;

// Legacy
export const SHOW_DATA_SELECTION = 'SHOW_DATA_SELECTION';
export const NAVIGATE_DATA_SELECTION = 'NAVIGATE_DATA_SELECTION';
export const RESET_DATA_SELECTION = 'RESET_DATA_SELECTION';

export const VIEWS = {
  LIST: 'LIST',
  TABLE: 'TABLE',
  CATALOG: 'CATALOG'
};

export const DATASETS = {
  CATALOG: 'dcatd',
  BAG: 'bag',
  BRK: 'brk',
  HR: 'hr'
};

const initialState = {
  isLoading: true,
  markers: [], // eg: [[52.1, 4.1], [52.2, 4.0]],
  geometryFilter: {
    markers: []
  },
  dataset: DATASETS.BAG,
  view: VIEWS.LIST,
  authError: false,
  errorMessage: '',
  page: 1,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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

    case CLEAR_STATE:
      return initialState;

    default:
      return state;
  }
}
// Action creators
export const fetchDataSelection = (payload) => ({
  type: FETCH_DATA_SELECTION_REQUEST,
  payload
});

export const setMarkers = (payload) => ({
  type: SET_MARKERS,
  payload
});

export const receiveDataSelectionSuccess = (payload) => ({
  type: FETCH_DATA_SELECTION_SUCCESS,
  payload
});

export const receiveDataSelectionFailure = (payload) => ({
  type: FETCH_DATA_SELECTION_FAILURE,
  payload
});

export const clearState = () => ({
  type: CLEAR_STATE
});

export const setDataSelectionGeometryFilter = (payload) => {
  const geoFilter = payload
    .markers
    .map((latLong) => `${latLong[0]}:${latLong[1]}`)
    .join('|');
  const meta = { query: { geoFilter, kaart: true } };
  return toAddressResults(payload, meta);
};

// Selectors
export const getDataSelection = (state) => state[REDUCER_KEY];
export const getDataSelectionResult = createSelector(
  getDataSelection,
  (dataSelection) => dataSelection.result || {});

export const getDataSelectionView = createSelector(
  getDataSelection,
  (dataSelection) => dataSelection && dataSelection.view
);

const generateMarkers = (markers) => (
  markers.map((markerLocation, index) => ({
    position: markerLocation,
    type: detailPointType,
    index
  })));

const getMapMarkers = createSelector([getDataSelection],
  (dataSelection) => dataSelection.markers);

export const getClusterMarkers = createSelector([getMapMarkers],
  (markers) => (
    markers && markers.clusterMarkers && markers.clusterMarkers.length ?
      generateMarkers(markers.clusterMarkers) : []
  ));

export const getGeoJsons = createSelector([getMapMarkers],
  (markers) => (
    markers && markers.geoJsons && markers.geoJsons.length ?
      markers.geoJsons : []
  ));
