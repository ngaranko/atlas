import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  FETCH_PANO_PREVIEW_REQUEST,
  fetchPanoPreviewSuccess,
  fetchPanoPreviewFailure, fetchPanoPreview
} from '../../ducks/preview/pano-preview';

import panoPreview from '../../services/pano-preview';
import {
  FETCH_MAP_SEARCH_RESULTS_REQUEST,
  getDataSearchLocation
} from '../../../shared/ducks/data-search/data-search';
import { routing } from '../../../app/routes';
import { FETCH_MAP_DETAIL_SUCCESS } from '../../../map/ducks/detail/map-detail';

function* fetchMapPano(action) {
  try {
    const location = action.payload;
    const panoramaResult = yield call(panoPreview, location);
    yield put(fetchPanoPreviewSuccess(panoramaResult));
  } catch (error) {
    yield put(fetchPanoPreviewFailure(error));
  }
}

function* possiblyFirePanoPreview() {
  const location = yield select(getDataSearchLocation);
  if (location) {
    yield put(fetchPanoPreview(location));
  }
}

function* fireFetchPanoPreview(action) {
  const location = action.mapDetail.location;
  yield put(fetchPanoPreview(location));
}

export default function* watchPanoPreview() {
  yield takeLatest(FETCH_PANO_PREVIEW_REQUEST, fetchMapPano);
  yield takeLatest([
    routing.map.type,
    routing.dataSearch.type,
    FETCH_MAP_SEARCH_RESULTS_REQUEST,
  ], possiblyFirePanoPreview);
  yield takeLatest(FETCH_MAP_DETAIL_SUCCESS, fireFetchPanoPreview);
}
