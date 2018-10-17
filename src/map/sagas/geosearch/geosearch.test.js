import { expectSaga, testSaga } from 'redux-saga-test-plan';

import watchGeoSearchRequest, { REQUEST_GEOSEARCH, requestGeoSearch } from './geosearch';
import { MAP_CLICK } from '../../ducks/map/map';

describe('watchFetchMapLayers', () => {
  const action = { type: MAP_CLICK };

  it('should watch REQUEST_GEOSEARCH and call fetchPanelLayers', () => {
    testSaga(watchGeoSearchRequest)
      .next()
      .takeLatestEffect(REQUEST_GEOSEARCH, requestGeoSearch)
      .next(action)
      .isDone();

    expectSaga(requestGeoSearch, {})
      .put({
        type: MAP_CLICK,
        payload: undefined
      })
      .run();
  });
});
