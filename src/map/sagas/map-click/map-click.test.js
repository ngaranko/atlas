import { testSaga } from 'redux-saga-test-plan';

import watchMapClick, { switchClickAction } from './map-click';

import ACTIONS from '../../../shared/actions';

describe('watchMapClick', () => {
  const action = { type: ACTIONS.SET_MAP_CLICK_LOCATION.id };

  it('should watch "ACTIONS.SET_MAP_CLICK_LOCATION.id" and call switchClickAction', () => {
    testSaga(watchMapClick)
      .next()
      .takeLatestEffect(ACTIONS.SET_MAP_CLICK_LOCATION.id, switchClickAction)
      .next(action)
      .isDone();
  });
});
