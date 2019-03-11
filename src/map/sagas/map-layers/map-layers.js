import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_MAP_LAYERS_FAILURE,
  FETCH_MAP_LAYERS_REQUEST,
  FETCH_MAP_LAYERS_SUCCESS
} from '../../ducks/layers/map-layers';

import { getPanelLayers } from '../../services';

export function* fetchMapLayers() {
  try {
    const mapLayers = yield call(getPanelLayers);
    yield put({ type: FETCH_MAP_LAYERS_SUCCESS, mapLayers });
  } catch (error) {
    yield put({ type: FETCH_MAP_LAYERS_FAILURE, error });
  }
}

export default function* watchFetchMapLayers() {
  yield takeLatest(FETCH_MAP_LAYERS_REQUEST, fetchMapLayers);
}
