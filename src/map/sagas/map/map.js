import { put, takeLatest } from 'redux-saga/effects';

import ACTIONS from '../../../shared/actions';

// needed for context-middleware.factory
// will dispatch a different action in that factory
function* dispatchMapClick(payload) {
  yield put({
    type: ACTIONS.MAP_CLICK,
    payload: [payload.location.latitude, payload.location.longitude]
  });
}

export default function* watchMapClick() {
  yield takeLatest(ACTIONS.SET_MAP_CLICK_LOCATION.id, dispatchMapClick);
}
