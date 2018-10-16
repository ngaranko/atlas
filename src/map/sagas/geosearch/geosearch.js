import { put, select, takeLatest } from 'redux-saga/effects';

import ACTIONS, { REQUEST_GEOSEARCH } from '../../../shared/actions';
import { getSelectedLocation } from '../../ducks/map/map-selectors';
import { fetchSearchResultsByLocation } from '../../ducks/preview-panel/map-preview-panel';
import { getMapSearchResults } from '../../../shared/ducks/search/search';

export function* requestGeoSearch(action) {
  // yield put({
  //   type: ACTIONS.MAP_CLICK,
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
