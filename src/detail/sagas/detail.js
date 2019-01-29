import { put, select } from 'redux-saga/effects';
import { fetchDetail as fetchDetailActionCreator } from '../../shared/ducks/detail/actions';
import { getDetail } from '../../shared/ducks/detail/selectors';
import { pageTypeToEndpoint } from '../../map/services/map-detail';

/* istanbul ignore next */ // TODO: refactor, test. Might not be necessary anymore.
export default function* fetchDetail() {
  const { type, subtype, id } = yield select(getDetail);
  const endpoint = pageTypeToEndpoint(type, subtype, id);
  const fetchAction = fetchDetailActionCreator(endpoint);
  yield put(fetchAction);
}
