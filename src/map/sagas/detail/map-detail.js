import { call, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_MAP_DETAIL_REQUEST,
  fetchMapDetailSuccess,
  fetchMapDetailFailure
} from '../../ducks/detail/map-detail';

import fetchDetail from '../../services/map-detail';

export function* fetchMapDetail(action) {
  try {
    const mapDetail = yield call(fetchDetail, action.endpoint, action.user);
    yield put(fetchMapDetailSuccess(action.endpoint, mapDetail || {}));
  } catch (error) {
    yield put(fetchMapDetailFailure);
  }
}

export default function* watchFetchMapDetail() {
  yield takeLatest(FETCH_MAP_DETAIL_REQUEST, fetchMapDetail);
}
