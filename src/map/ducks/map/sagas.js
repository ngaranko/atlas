import { put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { routing } from '../../../app/routes';

/**
 * This will set the url query. It will update by default (and keep the other arguments)
 * Unless when given payload: { replace: true }, this will replace the url query instead of updating
 * @param action
 * @returns {IterableIterator<*>}
 */
function* updateMap(action) {
  const state = yield select();
  try {
    yield put({
      type: routing.map.type, // Todo: get the type for the current page
      meta: {
        query: {
          // keep the other query params unless replace === true
          ...(!action.payload.replace) ? state.location.query : {},
          ...action.payload.query
        }
      }
    });
  } catch (error) {
    yield put({ type: 'MAP_UPDATE_ERROR', error });
  }
}

function* sanitizeUrl(action) {
  // check here if params are allowed. otherwise replace url
}

export default function* watchMapUpdate() {
  yield takeLatest('UPDATE_MAP', updateMap);
  yield takeEvery(routing.map.type, sanitizeUrl); // Todo: figure out why this isn't called the first time
}
