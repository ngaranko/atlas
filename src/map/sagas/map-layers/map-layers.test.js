import { expectSaga, testSaga } from 'redux-saga-test-plan';

import watchFetchMapLayers, { fetchMapLayers } from './map-layers';
import {
  FETCH_MAP_LAYERS_FAILURE,
  FETCH_MAP_LAYERS_REQUEST,
  FETCH_MAP_LAYERS_SUCCESS
} from '../../ducks/layers/map-layers';
import { getMapLayers } from '../../services';

describe('watchFetchMapLayers', () => {
  const action = { type: FETCH_MAP_LAYERS_REQUEST };

  it(`should watch ${FETCH_MAP_LAYERS_REQUEST} and call fetchPanelLayers`, () => {
    testSaga(watchFetchMapLayers)
      .next()
      .takeLatestEffect(FETCH_MAP_LAYERS_REQUEST, fetchMapLayers)
      .next(action)
      .isDone();
  });
});

describe('fetchMapLayers', () => {
  it('should call getMapLayers and dispatch the correct action', () => (
    expectSaga(fetchMapLayers)
      .provide({
        call(effect, next) {
          return effect.fn === getMapLayers ? 'mapLayers' : next();
        }
      })
      .put({
        type: FETCH_MAP_LAYERS_SUCCESS,
        mapLayers: 'mapLayers'
      })
      .run()
  ));

  it('should throw error and put error', () => {
    const error = new Error('My Error');
    testSaga(fetchMapLayers)
      .next()
      .throw(error)
      .put({ type: FETCH_MAP_LAYERS_FAILURE, error })
      .next()
      .isDone();
  });
});
