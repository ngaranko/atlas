import {
  FETCH_DATA_SELECTION_FAILURE,
  FETCH_DATA_SELECTION_REQUEST,
  FETCH_DATA_SELECTION_SUCCESS,
  SET_DATASET,
  SET_GEOMETRY_FILTERS,
  SET_MARKERS,
  SET_PAGE,
  SET_VIEW
} from './constants';

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
