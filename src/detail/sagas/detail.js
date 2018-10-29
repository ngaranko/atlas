import { put, takeLatest } from 'redux-saga/effects';
import { pageActionToEndpoint, routing } from '../../app/routes';

/* istanbul ignore next */ // TODO: refactor, test
export function* fetchDetail(action) {
  const fetchAction = pageActionToEndpoint(action);
  yield put(fetchAction);
}

/* istanbul ignore next */ // TODO: refactor, test
export function* watchDetailRoute() {
  yield takeLatest([
    routing.dataDetail.type
  ], fetchDetail);
}
