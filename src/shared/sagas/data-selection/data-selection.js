import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  clearState,
  DATASETS,
  FETCH_DATA_SELECTION_REQUEST,
  fetchDataSelection,
  getDataSelection,
  receiveDataSelectionFailure,
  receiveDataSelectionSuccess,
  SET_DATASET,
  SET_GEOMETRY_FILTERS,
  setMarkers,
  VIEWS
} from '../../ducks/data-selection/data-selection';
import { routing } from '../../../app/routes';
import dataselectionConfig from '../../services/data-selection/data-selection-config';
import { getMarkers, query } from '../../services/data-selection/data-selection-api';
import { getMapBoundingBox, getMapZoom } from '../../../map/ducks/map/map-selectors';
import { MAP_START_DRAWING } from '../../../map/ducks/map/map';
import { getLocationQuery } from '../../../store/redux-first-router';
import { getFilters } from '../../ducks/filters/filters';

const defaultParams = {
  dataset: DATASETS.BAG,
  view: VIEWS.LIST
};

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

function* handleRoutes() {
  const state = yield select();
  const dataSelection = getDataSelection(state);
  const activeFilters = getFilters(state);
  try {
    yield put(
      fetchDataSelection({
        ...defaultParams,
        ...dataSelection,
        activeFilters
      })
    );
  } catch (e) {
    yield put(receiveDataSelectionFailure({
      error: e.message,
      dataset: dataSelection.dataset
    }));
  }
}

const DATASET_ROUTE_MAPPER = {
  hr: routing.establishments.type,
  bag: routing.addresses.type,
  brk: routing.cadastralObjects.type
};

function* switchPage(action) {
  const state = yield select();
  const queryParams = getLocationQuery(state);
  yield put({
    type: DATASET_ROUTE_MAPPER[action.payload],
    meta: {
      query: {
        listView: true,
        ...queryParams
      }
    }
  });
}

function* goToAddressResults() {
  yield call(switchPage, { payload: DATASETS.BAG });
}

function* clearResults() {
  yield put(clearState());
}

export default function* watchFetchDataSelection() {
  yield takeLatest(FETCH_DATA_SELECTION_REQUEST, retrieveDataSelection);
  yield takeLatest(
    [routing.addresses.type, routing.establishments.type, routing.cadastralObjects.type],
    handleRoutes
  );
  yield takeLatest(SET_GEOMETRY_FILTERS, goToAddressResults);
  yield takeLatest(SET_DATASET, switchPage);

  // Legacy shit
  yield takeLatest(MAP_START_DRAWING, clearResults);
}
