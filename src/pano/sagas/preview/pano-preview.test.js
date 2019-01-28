import { expectSaga, testSaga } from 'redux-saga-test-plan';
import watchFetchMapPano, { fetchMapPano } from './pano-preview';
import {
  FETCH_PANO_PREVIEW_FAILURE,
  FETCH_PANO_PREVIEW_REQUEST,
  FETCH_PANO_PREVIEW_SUCCESS
} from '../../ducks/preview/pano-preview';
import panoPreview from '../../services/pano-preview';

describe('watchFetchMapPano', () => {
  it(`should watch ${FETCH_PANO_PREVIEW_REQUEST} and call fetchFilters`, () => {
    const action = { type: FETCH_PANO_PREVIEW_SUCCESS };
    testSaga(watchFetchMapPano)
      .next()
      .takeLatestEffect(FETCH_PANO_PREVIEW_REQUEST, fetchMapPano)
      .next(action)
      .isDone();
  });
});

describe('fetchMapPano', () => {
  it('should dispatch the correct action', () => (
    expectSaga(fetchMapPano, { location: '' })
      .provide({
        call(effect, next) {
          return effect.fn === panoPreview ? 'payload' : next();
        }
      })
      .put({
        type: FETCH_PANO_PREVIEW_SUCCESS,
        panoResult: 'payload'
      })
      .run()
  ));

  it('should throw error and put error', () => {
    const error = new Error('My Error');
    testSaga(fetchMapPano, {})
      .next()
      .throw(error)
      .put({ type: FETCH_PANO_PREVIEW_FAILURE, error })
      .next()
      .isDone();
  });
});
