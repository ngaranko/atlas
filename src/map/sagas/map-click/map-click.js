import { put, select, takeLatest } from 'redux-saga/effects';
import { getLayers } from '../../ducks/panel-layers/map-panel-layers';
import { getStraatbeeld } from '../../../shared/ducks/straatbeeld/straatbeeld';
import { SET_MAP_CLICK_LOCATION, UPDATE_MAP } from '../../ducks/map/map';
import { getMapZoom } from '../../ducks/map/map-selectors';
import { REQUEST_GEOSEARCH, REQUEST_NEAREST_DETAILS } from '../geosearch/geosearch';

export function* switchClickAction(action) {
  const straatbeeld = yield select(getStraatbeeld);
  const zoom = yield select(getMapZoom);
  const layers = yield select(getLayers);

  console.log('map-click, action: ', action);

  if (!straatbeeld && layers.length) {
    yield put({
      type: REQUEST_NEAREST_DETAILS,
      payload: {
        location: action.location,
        layers,
        zoom
      }
    });
  } else {
    yield put({
      type: REQUEST_GEOSEARCH,
      payload: [action.location.latitude, action.location.longitude]
    });
  }

  yield put({
    type: UPDATE_MAP,
    payload: {
      query: {
        selectedLocation: `${action.location.latitude},${action.location.longitude}`
      }
    }
  });
}

export default function* watchMapClick() {
  yield takeLatest(SET_MAP_CLICK_LOCATION, switchClickAction);
}
