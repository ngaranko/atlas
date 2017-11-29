import { call, put, takeLatest } from 'redux-saga/effects';

import detail from '../../services/map-detail';

function* fetchMapDetail(action) {
  try {
    const mapDetail = yield call(detail, action.endpoint, action.user);
    yield put({
      type: 'FETCH_MAP_DETAIL_SUCCESS',
      endpoint: action.endpoint,
      mapDetail
    });
  } catch (error) {
    yield put({ type: 'FETCH_MAP_DETAIL_FAILURE', error });
  }
}

export default function* watchFetchMapDetail() {
  yield takeLatest('FETCH_MAP_DETAIL_REQUEST', fetchMapDetail);
}
