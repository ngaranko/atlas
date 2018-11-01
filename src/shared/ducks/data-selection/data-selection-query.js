import {
  initialState,
  CLEAR_GEOMETRY_FILTERS,
  getDataSelectionPage,
  getGeometryFilters, isListView,
  RESET_DATA_SELECTION,
  SET_GEOMETRY_FILTERS,
  SET_PAGE, SET_VIEW
} from './data-selection';

const getEncodedGeometryFilters = (state) =>
  getGeometryFilters(state).markers.map((latLong) => `${latLong[0]}:${latLong[1]}`).join('|');

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
    selector: isListView
  }
};

export const ACTIONS = [
  SET_PAGE,
  SET_GEOMETRY_FILTERS,
  RESET_DATA_SELECTION,
  CLEAR_GEOMETRY_FILTERS,
  SET_VIEW
];
