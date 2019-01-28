import { call, put, takeLatest } from 'redux-saga/effects';

import { getPanelLayers } from '../../services';

import {
  FETCH_PANEL_ITEMS_REQUEST,
  FETCH_PANEL_ITEMS_SUCCESS,
  FETCH_PANEL_ITEMS_FAILURE
} from '../../ducks/panel-layers/map-panel-layers';

export function* fetchPanelLayers() {
  try {
    const panelLayers = yield call(getPanelLayers);
    yield put({ type: FETCH_PANEL_ITEMS_SUCCESS, panelLayers });
  } catch (error) {
    yield put({ type: FETCH_PANEL_ITEMS_FAILURE, error });
  }
}

export default function* watchFetchMapPanelLayers() {
  yield takeLatest(FETCH_PANEL_ITEMS_REQUEST, fetchPanelLayers);
}
