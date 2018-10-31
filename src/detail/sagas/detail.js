import { put, select, takeLatest } from 'redux-saga/effects';
import { pageTypeToEndpoint, routing } from '../../app/routes';
import { getDetail, fetchDetail as fetchDetailActionCreator } from '../../shared/ducks/detail/detail';

/* istanbul ignore next */ // TODO: refactor, test
export function* fetchDetail() {
  const { type, subtype, id } = yield select(getDetail);
  const endpoint = pageTypeToEndpoint(type, subtype, id);
  const fetchAction = fetchDetailActionCreator(endpoint);
  yield put(fetchAction);
}

/* istanbul ignore next */ // TODO: refactor, test
export function* watchDetailRoute() {
  yield takeLatest([
    routing.dataDetail.type
  ], fetchDetail);
}
