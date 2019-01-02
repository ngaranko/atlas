import { testSaga } from 'redux-saga-test-plan';
import watchDetailRoute, { fetchDetail } from './detail';
import { routing } from '../../app/routes';

describe('watchDetailRoute', () => {
  const action = { type: routing.dataDetail.type };

  it('should watch routing.dataDetail.type and call fetchDetail', () => {
    testSaga(watchDetailRoute)
      .next()
      .takeLatestEffect([routing.dataDetail.type], fetchDetail)
      .next(action)
      .next()
      .isDone();
  });
});
