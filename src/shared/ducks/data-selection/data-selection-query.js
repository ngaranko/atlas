import {
  CLEAR_GEOMETRY_FILTERS, FETCH_DATA_SELECTION_SUCCESS,
  getDataSelectionPage,
  getGeometryFilters,
  getGeometryFiltersMarkers,
  initialState,
  isListView,
  RESET_DATA_SELECTION,
  SET_GEOMETRY_FILTERS,
  SET_PAGE,
  SET_VIEW, VIEWS
} from './data-selection';

const getEncodedGeometryFilters = (state) => {
  const markers = getGeometryFiltersMarkers(state);
  if (markers) {
    return markers.map((latLong) => `${latLong[0]}:${latLong[1]}`).join('|');
  }
  return undefined;
};

const getGeometryFilterDescription = (state) => getGeometryFilters(state).description;

export default {
  page: {
    selector: getDataSelectionPage,
    defaultValue: initialState.page
  },
  geoFilter: {
    selector: getEncodedGeometryFilters
  },
  geoFilterDescription: {
    selector: getGeometryFilterDescription
  },
  listView: {
    selector: isListView,
    defaultValue: initialState.view === VIEWS.LIST
  }
};

export const ACTIONS = [
  SET_PAGE,
  SET_GEOMETRY_FILTERS,
  RESET_DATA_SELECTION,
  CLEAR_GEOMETRY_FILTERS,
  FETCH_DATA_SELECTION_SUCCESS,
  SET_VIEW
];
