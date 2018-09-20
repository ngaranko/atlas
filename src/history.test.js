import historyInstance, { history, locationHandler } from './history';
import ACTIONS from './shared/actions';

describe.only('the history object', () => {
  let store;

  beforeEach(() => {
    store = {
      dispatch: jest.fn()
    };
  });

  beforeEach(() => {
    historyInstance.initialize(store);
  });

  it('should listen handle location hashed search params', () => {
    const location = {
      hash: '#?foo=bar&abc=xyz'
    };

    history.locationHandler(location);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.URL_CHANGE,
      payload: {
        foo: 'bar',
        abc: 'xyz'
      }
    });
  });

  it('should not parse misformed hash', () => {
    const location = {
      hash: '?foo=bar&abc=xyz' // Note: no hash prefix
    };

    locationHandler(location);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.URL_CHANGE,
      payload: {}
    });
  });
});
