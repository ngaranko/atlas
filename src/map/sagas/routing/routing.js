import { call, put, select, takeLatest } from 'redux-saga/effects';
import get from 'lodash.get';
import { routing } from '../../../app/routes';
import { FETCH_DETAIL } from '../../../shared/ducks/detail/detail';
import {
  getImageDataById,
  getImageDataByLocation
} from '../../../shared/services/straatbeeld-api/straatbeeld-api';
import {
  FETCH_STRAATBEELD_BY_HOTSPOT,
  getStraatbeeld,
  SET_STRAATBEELD_HISTORY,
  setStraatbeeld
} from '../../../shared/ducks/straatbeeld/straatbeeld';

function* fetchDetail(action) {
  const state = yield select();

  // Todo: must be improved / removed when dispatch-logic in MapPreviePanel is removed
  if (get(action, 'meta.query.detailEndpoint')) {
    yield put({
      type: FETCH_DETAIL,
      payload: state.map.detailEndpoint
    });
  }
}

export function* fetchStraatbeeldImages({ type }) {
  const state = yield select();
  const { history, id, location } = getStraatbeeld(state);

  const imageData = yield call(
    (type === SET_STRAATBEELD_HISTORY) ? getImageDataByLocation : getImageDataById,
    (type === SET_STRAATBEELD_HISTORY) ?
      location :
      id,
    history
  );
  yield put(setStraatbeeld(imageData));
}

function* watchRoutes() {
  yield takeLatest([
    routing.panorama.type,

    // Todo: remove these from routes saga
    FETCH_STRAATBEELD_BY_HOTSPOT,
    SET_STRAATBEELD_HISTORY
  ], fetchStraatbeeldImages);

  yield takeLatest([routing.map.type, routing.detail.type], fetchDetail);
}

export default watchRoutes;
