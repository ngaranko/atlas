import { expectSaga, testSaga } from 'redux-saga-test-plan';

import watchGeoSearchRequest, { requestGeoSearch } from './geosearch';
import ACTIONS from '../../../shared/actions';

describe('watchFetchMapLayers', () => {
  const action = { type: ACTIONS.MAP_CLICK };

  it('should watch REQUEST_GEOSEARCH and call fetchPanelLayers', () => {
    testSaga(watchGeoSearchRequest)
      .next()
      .takeLatestEffect('REQUEST_GEOSEARCH', requestGeoSearch)
      .next(action)
      .isDone();

    expectSaga(requestGeoSearch, {})
      .put({
        type: ACTIONS.MAP_CLICK,
        payload: undefined
      })
      .run();
  });
});
