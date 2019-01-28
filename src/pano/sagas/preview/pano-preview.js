import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_PANO_PREVIEW_FAILURE,
  FETCH_PANO_PREVIEW_REQUEST,
  FETCH_PANO_PREVIEW_SUCCESS
} from '../../ducks/preview/pano-preview';

import panoPreview from '../../services/pano-preview';

export function* fetchMapPano(action) {
  try {
    const panoResult = yield call(panoPreview, action.location);
    yield put({ type: FETCH_PANO_PREVIEW_SUCCESS, panoResult });
  } catch (error) {
    yield put({ type: FETCH_PANO_PREVIEW_FAILURE, error });
  }
}

export default function* watchFetchMapPano() {
  yield takeLatest(FETCH_PANO_PREVIEW_REQUEST, fetchMapPano);
}
