import { call, put, takeLatest, select } from 'redux-saga/effects';

import fetchNearestDetail, { getResult } from '../../services/nearest-detail/nearest-detail';

import ACTIONS from '../../../shared/actions';

const getMapZoom = (state) => state.map.zoom;
const getStraatbeeld = (state) => state.straatbeeld;

const getMapLayers = (state) => (
  state.map.overlays.map((overlay) => (
    state.mapLayers.layers.items.find((layer) => layer.id === overlay.id) || { noDetail: true }
  )).filter((layer) => (
   layer.detailUrl && !layer.noDetail
  )).filter((layer) => (
   !layer.authScope || state.user.scopes.includes(layer.authScope)
  ))
);

function* switchClickAction(payload) {
  const straatbeeld = yield select(getStraatbeeld);
  const layers = yield select(getMapLayers);
  debugger;
  if (!straatbeeld && layers.length > 0) {
    const zoom = yield select(getMapZoom);
    yield put({
      type: 'REQUEST_NEAREST_DETAILS',
      payload: {
        location: payload.location,
        layers,
        zoom
      }
    });
  } else {
    yield put({
      type: ACTIONS.MAP_CLICK,
      payload: [payload.location.latitude, payload.location.longitude]
    });
  }
}

function* fetchNearestDetails(action) {
  const {
    location,
    layers,
    zoom
  } = action.payload;
  try {
    const results = yield call(fetchNearestDetail, location, layers, zoom);
    const foundResult = getResult(results);
    if (foundResult.id) {
      yield put({
        type: ACTIONS.MAP_HIGHLIGHT,
        payload: false
      });
      yield put({
        type: ACTIONS.FETCH_DETAIL,
        payload: foundResult.uri,
        skippedSearchResults: true
      });
    } else {
      yield put({
        type: ACTIONS.MAP_CLICK,
        payload: [location.latitude, location.longitude]
      });
    }
  } catch (error) {
    // yield put({ type: 'FETCH_MAP_SEARCH_RESULTS_FAILURE', error });
  }
}

export function* watchFetchNearestDetails() {
  yield takeLatest('REQUEST_NEAREST_DETAILS', fetchNearestDetails);
}

export default function* watchMapClick() {
  yield takeLatest(ACTIONS.SET_MAP_CLICK_LOCATION.id, switchClickAction);
}
