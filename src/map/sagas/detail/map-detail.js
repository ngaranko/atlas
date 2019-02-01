import get from 'lodash.get';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  fetchMapDetailFailure,
  fetchMapDetailSuccess,
  getCurrentEndpoint,
  getMapDetail
} from '../../ducks/detail/map-detail';
import { closeMapPanel, mapLoadingAction } from '../../ducks/map/map';
import fetchLegacyDetail, { getData } from '../../../detail/sagas/detail';
import fetchDetail from '../../services/map-detail';
import { FETCH_MAP_DETAIL_REQUEST } from '../../ducks/detail/constants';
import { getUser } from '../../../shared/ducks/user/user';
import { waitForAuthentication } from '../../../shared/sagas/user/user';
import { getDetailEndpoint } from '../../../shared/ducks/detail/selectors';
import { VIEW_MODE } from '../../../shared/ducks/ui/ui';
import { fetchDetailSuccess } from '../../../shared/ducks/detail/actions';
import PARAMETER from '../../../store/parameters';

export function* fetchMapDetail() {
  try {
    yield call(waitForAuthentication);
    const user = yield select(getUser);
    const endpoint = yield select(getCurrentEndpoint);
    const mapDetail = yield call(fetchDetail, endpoint, user);
    // console.log('fetchMapDetail', endpoint, mapDetail);
    yield put(fetchMapDetailSuccess(endpoint, mapDetail || {}));
    yield put(mapLoadingAction(false));

    const data = yield call(getData, endpoint);
    // console.log('fetchMapDetail, after call fetchDetailSuccess', data);
    yield put(fetchDetailSuccess(data));
  } catch (error) {
    yield put(fetchMapDetailFailure(error));
    yield put(mapLoadingAction(false));
  }
}

export function* fetchDetailEffect(action) {
  const oldView = get(action, `meta.location.prev.query[${PARAMETER.VIEW}]`, null);
  const newView = get(action, `meta.location.current.query[${PARAMETER.VIEW}]`, null);
  if (oldView !== newView && newView === VIEW_MODE.SPLIT) {
    yield put(closeMapPanel());
  }

  const endpoint = yield select(getDetailEndpoint);
  yield put(getMapDetail(endpoint));
  yield call(fetchLegacyDetail);
}

export default function* watchMapDetail() {
  yield takeLatest(FETCH_MAP_DETAIL_REQUEST, fetchMapDetail);
}
