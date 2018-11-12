import { createSelector } from 'reselect';
import { detailPointType } from '../../../map/components/leaflet/services/icons.constant';
import { routing } from '../../../app/routes';

export const REDUCER_KEY = 'dataSelection';
export const FETCH_DATA_SELECTION_REQUEST = `${REDUCER_KEY}/FETCH_DATA_SELECTION_REQUEST`;
export const FETCH_DATA_SELECTION_SUCCESS = `${REDUCER_KEY}/FETCH_DATA_SELECTION_SUCCESS`;
export const FETCH_DATA_SELECTION_FAILURE = `${REDUCER_KEY}/FETCH_DATA_SELECTION_FAILURE`;
export const CLEAR_STATE = `${REDUCER_KEY}/CLEAR_STATE`;
export const RESET_DATA_SELECTION = 'RESET_DATA_SELECTION';

export const SET_GEOMETRY_FILTERS = `${REDUCER_KEY}/SET_GEO_FILTERS`;
export const CLEAR_GEOMETRY_FILTERS = `${REDUCER_KEY}/CLEAR_GEOMETRY_FILTERS`;

export const SET_VIEW = `${REDUCER_KEY}/SET_VIEW`;
export const SET_PAGE = `${REDUCER_KEY}/SET_PAGE`;
export const SET_DATASET = `${REDUCER_KEY}/SET_DATASET`;
const SET_MARKERS = `${REDUCER_KEY}/SET_MARKERS`;

const ROUTE_DATASET_MAPPER = {
  [routing.cadastralObjects.type]: 'brk',
  [routing.establishments.type]: 'hr',
  [routing.addresses.type]: 'bag'
};

export const VIEWS = {
  LIST: 'LIST',
  TABLE: 'TABLE',
  CATALOG: 'CATALOG'
};

export const DATASETS = {
  BAG: 'bag',
  BRK: 'brk',
  HR: 'hr'
};

export const initialState = {
  isLoading: false,
  markers: [], // eg: [[52.1, 4.1], [52.2, 4.0]],
  geometryFilter: {
    markers: undefined
  },
  dataset: DATASETS.BAG,
  view: VIEWS.TABLE,
  authError: false,
  errorMessage: '',
  page: 1
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case routing.addresses.type:
    case routing.establishments.type:
    case routing.cadastralObjects.type: {
      if (action.meta.query) {
        const { geoFilter, geoFilterDescription, listView } = action.meta.query;
        const markers = geoFilter && geoFilter.length
          ? geoFilter.split('|').map((latLng) => latLng.split(':').map((str) => parseFloat(str)))
          : [];
        return {
          ...state,
          dataset: ROUTE_DATASET_MAPPER[action.type],
          view: listView ? VIEWS.LIST : VIEWS.TABLE,
          geometryFilter: {
            markers,
            description: geoFilterDescription
          }
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

    case CLEAR_GEOMETRY_FILTERS:
      return {
        ...state,
        geometryFilter: {
          markers: []
        }
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

    case CLEAR_STATE:
      return initialState;

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
export const clearState = () => ({ type: CLEAR_STATE });
export const setGeometryFilter = (payload) => ({ type: SET_GEOMETRY_FILTERS, payload });
export const clearGeometryFilter = () => ({ type: CLEAR_GEOMETRY_FILTERS });

export const receiveDataSelectionSuccess = (payload) => ({
  type: FETCH_DATA_SELECTION_SUCCESS,
  payload
});

export const receiveDataSelectionFailure = (payload) => ({
  type: FETCH_DATA_SELECTION_FAILURE,
  payload
});

// Selectors
export const getDataSelection = (state) => state[REDUCER_KEY];
export const getDataSelectionPage = createSelector(
  getDataSelection,
  (dataSelection) => dataSelection.page);

export const getGeometryFilters = createSelector(
  getDataSelection,
  (dataSelection) => dataSelection.geometryFilter);
export const getGeometryFiltersMarkers = createSelector(
  getGeometryFilters,
  (filters) => filters && filters.markers);

export const getDataSelectionResult = createSelector(
  getDataSelection,
  (dataSelection) => dataSelection.result || {});

export const getDataSelectionView = createSelector(
  getDataSelection,
  (dataSelection) => dataSelection && dataSelection.view
);

export const isListView = createSelector(
  getDataSelectionView,
  (view) => view === VIEWS.LIST
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

export const getFilters = createSelector(
  getDataSelectionResult, (result) => result.filters || []
);
export const getGeometryFilterDescription = (state) => getGeometryFilters(state).description;
