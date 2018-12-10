import { testSaga } from 'redux-saga-test-plan';
import watchMapDetail, { fetchMapDetail } from './map-detail';
import {
  FETCH_MAP_DETAIL_REQUEST,
  fetchMapDetailFailure,
  fetchMapDetailSuccess
} from '../../ducks/detail/map-detail';

describe('watchFetchMapDetail', () => {
  const action = { type: FETCH_MAP_DETAIL_REQUEST };

  it('should watch REQUEST_NEAREST_DETAILS and call fetchPanelLayers', () => {
    testSaga(watchMapDetail)
      .next()
      .takeLatestEffect(FETCH_MAP_DETAIL_REQUEST, fetchMapDetail)
      .next(action)
      .next()
      .isDone();
  });
});

describe('fetchNearestDetails', () => {
  const action = {
    endpoint: 'bag/ligplaats/',
    user: 'user'
  };

  it('should call fetchMapDetail and dispatch the correct action', () => {
    testSaga(fetchMapDetail)
      .next()
      .next()
      .next()
      .next(action.endpoint)
      .next('mapDetail')
      .put(fetchMapDetailSuccess(action.endpoint, 'mapDetail'))
      .next()
      .isDone();
  });

  it('should throw error and dispatch geosearch', () => {
    const error = new Error('My Error');
    testSaga(fetchMapDetail, action)
      .next()
      .throw(error)
      .put(fetchMapDetailFailure)
      .next()
      .isDone();
  });
});
