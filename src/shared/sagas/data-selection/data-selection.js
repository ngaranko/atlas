import { call, put, select, takeLatest } from 'redux-saga/effects';
import queryString from 'querystring';
import {
  FETCH_DATA_SELECTION_REQUEST,
  fetchDataSelection,
  getDataSelection,
  receiveDataSelectionFailure,
  receiveDataSelectionSuccess,
  SET_DATASET,
  SET_GEOMETRY_FILTERS,
  SET_VIEW,
  setMarkers,
  VIEWS
} from '../../ducks/data-selection/data-selection';
import { routing } from '../../../app/routes';
import dataselectionConfig from '../../services/data-selection/data-selection-config';
import { getMarkers, query } from '../../services/data-selection/data-selection-api';
import { getMapBoundingBox, getMapZoom } from '../../../map/ducks/map/map-selectors';
import { ADD_FILTER, EMPTY_FILTERS, getFilters, REMOVE_FILTER } from '../../ducks/filters/filters';
import { isDataSelectionCurrentPage } from '../../../store/redux-first-router';

function* getMapMarkers(dataset, activeFilters) {
  const state = yield select();
  const markerData = yield call(getMarkers,
    dataset, activeFilters, getMapZoom(state), getMapBoundingBox(state));
  yield put(setMarkers(markerData));
}

function* retrieveDataSelection(action) {
  const { dataset, view, activeFilters, page, searchText, geometryFilter, catalogFilters } =
    action.payload;
  try {
    const result = yield call(query,
      dataset, view, activeFilters, page, searchText, geometryFilter, catalogFilters);

    // Put the results in the reducer
    yield put(receiveDataSelectionSuccess({
      dataset, view, activeFilters, page, geometryFilter, result
    }));

    // Check if markers need to be fetched
    const { MAX_NUMBER_OF_CLUSTERED_MARKERS } = dataselectionConfig.datasets[dataset];
    const markersShouldBeFetched = (
      view === VIEWS.LIST && result.numberOfRecords <= MAX_NUMBER_OF_CLUSTERED_MARKERS
    );

    if (markersShouldBeFetched) {
      yield call(getMapMarkers, dataset, activeFilters);
    }
  } catch (e) {
    yield put(receiveDataSelectionFailure({
      error: e.message,
      dataset
    }));
  }
}

function* fireRequest() {
  const state = yield select();

  // Always ensure we are on the right page, otherwise this can be called unintentionally
  if (isDataSelectionCurrentPage(state)) {
    const dataSelection = getDataSelection(state);
    const activeFilters = getFilters(state);

    yield put(
      fetchDataSelection({
        ...dataSelection,
        activeFilters
      })
    );
  }
}

const DATASET_ROUTE_MAPPER = {
  hr: routing.establishments.type,
  bag: routing.addresses.type,
  brk: routing.cadastralObjects.type
};

function* switchPage() {
  const state = yield select();
  const dataSelection = getDataSelection(state);
  yield put({
    type: DATASET_ROUTE_MAPPER[dataSelection.dataset],
    meta: {
      query: {
        listView: true,
        ...queryString.decode(location.search) // Todo: temporary solution to pass existing query
      }
    }
  });
}

export default function* watchFetchDataSelection() {
  yield takeLatest(
    [SET_VIEW, ADD_FILTER, REMOVE_FILTER, EMPTY_FILTERS,
      routing.addresses.type, routing.establishments.type, routing.cadastralObjects.type
    ],
    fireRequest
  );

  // Actions
  yield takeLatest(FETCH_DATA_SELECTION_REQUEST, retrieveDataSelection);
  yield takeLatest([SET_DATASET, SET_GEOMETRY_FILTERS], switchPage);
}
