import { redirect } from 'redux-first-router';
import { put, select, takeLatest } from 'redux-saga/effects';
import { routing } from '../../../app/routes';

/**
 * This will set the url query. It will update by default (and keep the other arguments)
 * Unless when given payload: { replace: true }, this will replace the url query instead of updating
 * @param action
 * @returns {IterableIterator<*>}
 */
function* updateMapQuery(action) {
  const state = yield select();
  try {
    yield put(redirect({
      type: routing.map.type, // Todo: get the type for the current page
      meta: {
        query: {
          // keep the other query params unless replace === true
          ...(!action.payload.replace) ? state.location.query : {},
          ...action.payload.query
        }
      }
    }));
  } catch (error) {
    yield put({ type: 'MAP_UPDATE_ERROR', error });
  }
}

export default function* watchMapUpdate() {
  yield takeLatest('UPDATE_MAP', updateMapQuery);
}
