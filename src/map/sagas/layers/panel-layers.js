import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../services';

import {
  FETCH_LEGENDA_ITEMS_REQUEST,
  FETCH_LEGENDA_ITEMS_SUCCESS,
  FETCH_LEGENDA_ITEMS_FAILURE
} from '../../ducks/panel-layers/panel-layers';

function* fetchPanelLayers() {
  try {
    const panelLayers = yield call(api.getPanelLayers);
    yield put({ type: FETCH_LEGENDA_ITEMS_SUCCESS, panelLayers });
  } catch (error) {
    yield put({ type: FETCH_LEGENDA_ITEMS_FAILURE, error });
  }
}

export default function* watchFetchPanelLayers() {
  yield takeLatest(FETCH_LEGENDA_ITEMS_REQUEST, fetchPanelLayers);
}
