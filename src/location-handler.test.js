import locationHandlerCreator from './location-handler';
import ACTIONS from './shared/actions';

describe('the location handler', () => {
  let store;
  let locationHandler;

  beforeEach(() => {
    store = {
      dispatch: jest.fn()
    };
  });

  beforeEach(() => {
    locationHandler = locationHandlerCreator(store);
  });

  it('should listen handle location hashed search params', () => {
    const location = {
      hash: '#?foo=bar&abc=xyz'
    };

    locationHandler(location);

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
