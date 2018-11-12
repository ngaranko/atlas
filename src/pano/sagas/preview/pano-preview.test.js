import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { fetchMapPano } from './pano-preview';
import {
  fetchPanoPreviewFailure,
  fetchPanoPreviewSuccess
} from '../../ducks/preview/pano-preview';
import panoPreview from '../../services/pano-preview';

describe('fetchMapPano', () => {
  it('should dispatch the correct action', () => (
    expectSaga(fetchMapPano, { location: '' })
      .provide({
        call(effect, next) {
          return effect.fn === panoPreview ? 'payload' : next();
        }
      })
      .put(fetchPanoPreviewSuccess('payload'))
      .run()
  ));

  it('should throw error and put error', () => {
    const error = new Error('My Error');
    testSaga(fetchMapPano, {})
      .next()
      .throw(error)
      .put(fetchPanoPreviewFailure(error))
      .next()
      .isDone();
  });
});
