import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  FETCH_MAP_DETAIL_REQUEST,
  fetchMapDetailSuccess,
  fetchMapDetailFailure,
  getMapDetail
} from '../../ducks/detail/map-detail';

import fetchDetail from '../../services/map-detail';
import { getDetailEndpoint } from '../../../shared/ducks/detail/detail';
import { routing } from '../../../app/routes';

export function* fetchMapDetail(action) {
  try {
    const mapDetail = yield call(fetchDetail, action.endpoint, action.user);
    yield put(fetchMapDetailSuccess(action.endpoint, mapDetail || {}));
  } catch (error) {
    yield put(fetchMapDetailFailure);
  }
}

function* fireFetchMapDetail() {
  const endpoint = yield select(getDetailEndpoint);
  yield put(getMapDetail(endpoint));
}

export default function* watchMapDetail() {
  yield takeLatest(FETCH_MAP_DETAIL_REQUEST, fetchMapDetail);

  yield takeLatest([
    routing.dataDetail.type
  ], fireFetchMapDetail);
}
