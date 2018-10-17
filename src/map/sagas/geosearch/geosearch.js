import { put, select, takeLatest } from 'redux-saga/effects';
import { fetchSearchResultsByLocation } from '../../ducks/preview-panel/map-preview-panel';
import { getMapSearchResults } from '../../../shared/ducks/search/search';

export const REQUEST_GEOSEARCH = 'REQUEST_GEOSEARCH';
export const REQUEST_NEAREST_DETAILS = 'REQUEST_NEAREST_DETAILS';

export function* requestGeoSearch(action) {
  // yield put({
  //   type: MAP_CLICK,
  //   payload: action.payload
  // });
  // getCurrentLocation
  console.log('geosearch.js', action);
  const locationArray = action.payload;
  const location = {
    latitude: locationArray[0],
    longitude: locationArray[1]
  };
  // const location = yield select(getSelectedLocation);
  const newAction = fetchSearchResultsByLocation(location);
  yield put(newAction);
  yield put(getMapSearchResults(location)); // TODO: refactor, add user
    // fetchSearchResultsByLocation
}

export default function* watchGeoSearchRequest() {
  yield takeLatest(REQUEST_GEOSEARCH, requestGeoSearch);
}
