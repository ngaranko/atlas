import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  FETCH_PANORAMA_PREVIEW_REQUEST,
  fetchPanoramaPreviewSuccess,
  fetchPanoramaPreviewFailure, fetchPanoramaPreview
} from '../../../ducks/panorama/preview/panorama-preview';

import panoPreview from '../../../services/panorama-preview/pano-preview';
import {
  FETCH_MAP_SEARCH_RESULTS_REQUEST,
  getDataSearchLocation
} from '../../../ducks/data-search/data-search';
import { routing } from '../../../../app/routes';
import { FETCH_MAP_DETAIL_SUCCESS } from '../../../../map/ducks/detail/map-detail';

export function* fetchMapPano(action) {
  try {
    const location = action.payload;
    const panoramaResult = yield call(panoPreview, location);
    yield put(fetchPanoramaPreviewSuccess(panoramaResult));
  } catch (error) {
    yield put(fetchPanoramaPreviewFailure(error));
  }
}

function* possiblyFirePanoPreview() {
  const location = yield select(getDataSearchLocation);
  if (location) {
    yield put(fetchPanoramaPreview(location));
  }
}

function* fireFetchPanoPreview(action) {
  const location = action.mapDetail.location;
  yield put(fetchPanoramaPreview(location));
}

export default function* watchPanoPreview() {
  yield takeLatest(FETCH_PANORAMA_PREVIEW_REQUEST, fetchMapPano);
  yield takeLatest([
    routing.map.type,
    routing.dataSearch.type,
    FETCH_MAP_SEARCH_RESULTS_REQUEST
  ], possiblyFirePanoPreview);
  yield takeLatest(FETCH_MAP_DETAIL_SUCCESS, fireFetchPanoPreview);
}
