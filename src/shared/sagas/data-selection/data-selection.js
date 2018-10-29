import { call, put, select, takeLatest } from 'redux-saga/effects';
import get from 'lodash.get';
import {
  clearState,
  DATASETS,
  FETCH_DATA_SELECTION_REQUEST,
  fetchDataSelection,
  getDataSelection,
  NAVIGATE_DATA_SELECTION,
  receiveDataSelectionFailure,
  receiveDataSelectionSuccess,
  setMarkers,
  VIEWS
} from '../../ducks/data-selection/data-selection';
import { routing } from '../../../app/routes';
import dataselectionConfig from '../../services/data-selection/data-selection-config';
import { getMarkers, query } from '../../services/data-selection/data-selection-api';
import { getMapBoundingBox, getMapZoom } from '../../../map/ducks/map/map-selectors';
import { FETCH_DATA_SELECTION } from '../../../header/ducks/search/search';
import { MAP_START_DRAWING } from '../../../map/ducks/map/map';
import { isMapView } from '../../ducks/location/location';
import { APPLY_FILTERS } from '../../ducks/filters/filters';

const defaultParams = {
  dataset: DATASETS.BAG,
  view: VIEWS.LIST
};

const markersShouldBeFetched = (view, dataset, numberOfRecords) => view === VIEWS.LIST &&
  numberOfRecords <= dataselectionConfig.datasets[dataset].MAX_NUMBER_OF_CLUSTERED_MARKERS;

function* getMapMarkers(dataset, activeFilters) {
  const state = yield select();
  const markerData = yield call(getMarkers,
    dataset, activeFilters, getMapZoom(state), getMapBoundingBox(state));
  yield put(setMarkers(markerData));
}

function* fetchDefaultBagTable(action) {
  const state = yield select();
  const view = isMapView(state) ? VIEWS.LIST : VIEWS.TABLE;
  let activeFilters = [];
  if (action.meta.query && action.meta.query.filters) {
    activeFilters = JSON.parse(action.meta.query.filters);
  }

  let page = 1;
  console.log(action)
  if (action.meta.query && action.meta.query.page) {
    page = parseInt(action.meta.query.page);
  }
  yield put(fetchDataSelection({ dataset: DATASETS.BAG, view, activeFilters, page }));
}

function* retrieveDataSelection(action) {
  const { dataset, view, activeFilters, page, searchText, geometryFilter, catalogFilters } =
    action.payload;
  try {
    const result = yield call(query,
      dataset, view, activeFilters, page, searchText, geometryFilter, catalogFilters);

    // Put the results in the reducer
    yield put(receiveDataSelectionSuccess({ ...action.payload, result }));

    // Check if markers need to be fetched
    if (markersShouldBeFetched(view, dataset, result.numberOfRecords)) {
      yield call(getMapMarkers, dataset, activeFilters);
    }
  } catch (e) {
    yield put(receiveDataSelectionFailure({
      error: e.message,
      dataset
    }));
  }
}

const ROUTE_DATASET_MAPPER = {
  [routing.establishmentResults.type]: 'hr',
  [routing.addressResults.type]: 'bag'
};

function* handleRoutes(action) {
  const view = (get(action, 'meta.query.kaart')) ? VIEWS.LIST : VIEWS.TABLE;
  try {
    const { geoFilter } = action.meta.query;
    const markers = geoFilter.split('|').map((latLng) => latLng.split(':').map((str) => parseFloat(str)));
    yield call(retrieveDataSelection, {
      payload: {
        ...defaultParams,
        dataset: ROUTE_DATASET_MAPPER[action.type],
        view,
        geometryFilter: {
          markers
        },
        activeFilters: {
          shape: JSON.stringify(markers.map(([lat, lng]) => [lng, lat]))
        }
      }
    });
  } catch (e) {

  }
}

// Legacy shit

// Todo: move this
// function* handleLegacyRequest(action) {
//   const mergeInto = typeof action.payload === 'string' ? {
//     searchText: action.payload,
//     page: 1,
//     view: VIEWS.CATALOG,
//     dataset: DATASETS.CATALOG
//   } : action.payload;
//
//   const newView = mergeInto.view || action.payload.view || VIEWS.TABLE;
//
//   const emptyGeometryFilters = {
//     markers: [],
//     description: ''
//   };
//
//   const geoFilter = mergeInto.resetGeometryFilter
//     ? emptyGeometryFilters
//     : action.payload.geometryFilter || emptyGeometryFilters;
//
//   delete mergeInto.resetGeometryFilter;
//   delete mergeInto.emptyFilters;
//   delete mergeInto.filters;
//
//   const payload = {
//     ...mergeInto,
//     view: newView,
//     geometryFilter: { ...geoFilter }
//   };
//
//   yield call(doQuery, {
//     payload
//   });
// }

function* legacyHandleNavigation(action) {
  const dataSelection = yield select(retrieveDataSelection);
  yield call(retrieveDataSelection, {
    payload: {
      ...dataSelection,
      page: action.payload
    }
  });
}

function* clearResults() {
  yield put(clearState());
}

function* updateUrlQuery(action) {
  yield put({
    type: routing.adressen.type,
    meta: {
      query: {
        filters: JSON.stringify(action.payload)
      }
    }
  });
}

export function* watchFetchDataSelection() {
  yield takeLatest([FETCH_DATA_SELECTION_REQUEST], retrieveDataSelection);
  yield takeLatest([routing.addressResults.type, routing.establishmentResults.type], handleRoutes);
  yield takeLatest(routing.adressen.type, fetchDefaultBagTable);

  // Legacy shit
  yield takeLatest(APPLY_FILTERS, updateUrlQuery);
  // yield takeLatest(FETCH_DATA_SELECTION, handleLegacyRequest);
  yield takeLatest(NAVIGATE_DATA_SELECTION, legacyHandleNavigation);
  yield takeLatest(MAP_START_DRAWING, clearResults);
}
