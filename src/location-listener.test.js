import locationLister from './location-listener';
import ACTIONS from './shared/actions';

describe('the location listener', () => {
  let history;
  let store;
  beforeEach(() => {
    history = {
      listen: jest.fn()
    };
    store = {
      dispatch: jest.fn()
    };
  });

  it('should listen to route changes and fire an URL change', () => {
    locationLister(history, store);

    expect(history.listen).toHaveBeenCalled();

    const location = {
      hash: '#?foo=bar&abc=xyz'
    };
    // fire listener
    history.listen.mock.calls[0][0](location);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.URL_CHANGE,
      payload: {
        foo: 'bar',
        abc: 'xyz'
      }
    });
  });

  it('should not parse misformed hash', () => {
    locationLister(history, store);

    expect(history.listen).toHaveBeenCalled();

    const location = {
      hash: '?foo=bar&abc=xyz' // Note: no hash prefix
    };
    // fire listener
    history.listen.mock.calls[0][0](location);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.URL_CHANGE,
      payload: {}
    });
  });
});
