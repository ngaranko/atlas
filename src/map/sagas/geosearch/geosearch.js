import { put, select, takeLatest } from 'redux-saga/effects';
import { fetchSearchResultsByLocation } from '../../ducks/preview-panel/map-preview-panel';
import { getMapSearchResults } from '../../../shared/ducks/search/search';
import { getStraatbeeld } from '../../../shared/ducks/straatbeeld/straatbeeld';
import { getUser } from '../../../shared/ducks/user/user';

export const REQUEST_GEOSEARCH = 'REQUEST_GEOSEARCH';
export const REQUEST_NEAREST_DETAILS = 'REQUEST_NEAREST_DETAILS';

export function* requestGeoSearch(action) {
  const user = yield select(getUser);
  // yield put({
  //   type: MAP_CLICK,
  //   payload: action.payload
  // });
  // getCurrentLocation
  console.log('geosearch.js', action);
  const locationArray = action.payload || {};
  const location = {
    latitude: locationArray[0],
    longitude: locationArray[1]
  };
  // const location = yield select(getSelectedLocation);
  const newAction = fetchSearchResultsByLocation(location);
  yield put(newAction);
  yield put(getMapSearchResults(location, user));
    // fetchSearchResultsByLocation
}

export default function* watchGeoSearchRequest() {
  yield takeLatest(REQUEST_GEOSEARCH, requestGeoSearch);
}
