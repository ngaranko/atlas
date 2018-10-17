import { put, takeLatest } from 'redux-saga/effects';
import { pageActionToEndpoint, routing } from '../../app/routes';

export function* fetchDetail(action) {
  const fetchAction = pageActionToEndpoint(action);
  yield put(fetchAction);
}

export function* watchDetailRoute() {
  yield takeLatest([
    routing.adresDetail.type,
    routing.pandDetail.type
  ], fetchDetail);
}
