import * as Redux from 'redux';
import applicationState from './application-state';

jest.mock('redux');

describe('The applicationState', () => {
  const fakeReducer = 'I_AM_THE_REDUCER';
  const fakeDefaultState = 'THIS_IS_THE_DEFAULT_STATE';
  const fakeMiddleware = 'I_AM_MIDDLEWARE';
  const fakeEnhancer = 'I_AM_A_FAKE_ENHANCER';
  const fakeComposedEnhancer = 'I_AM_A_FAKE_COMPOSED_ENHANCER';
  const fakeStore = 'THIS_IS_THE_FAKE_STORE';

  // `initializeState` mock
  window.initializeState = (Redux_, reducer, defaultState, ...middleware) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux_.compose;
    const enhancer = composeEnhancers(
      Redux_.applyMiddleware(...middleware)
    );

    window.reduxStore = Redux_.createStore(reducer, defaultState, enhancer);
  };

  beforeEach(() => {
    Redux.compose.mockImplementation(() => fakeComposedEnhancer);
    Redux.applyMiddleware.mockImplementation(() => fakeEnhancer);
    Redux.createStore.mockImplementation(() => fakeStore);
  });

  afterEach(() => {
    Redux.compose.mockReset();
    Redux.applyMiddleware.mockReset();
    Redux.createStore.mockReset();
  });

  it('creates a Redux store by passing through a reducer, default state and middleware', () => {
    applicationState.initialize(fakeReducer, fakeDefaultState, fakeMiddleware);

    expect(Redux.applyMiddleware).toHaveBeenCalledWith(fakeMiddleware);
    expect(Redux.compose).toHaveBeenCalledWith(fakeEnhancer);
    expect(Redux.createStore).toHaveBeenCalledWith(fakeReducer, fakeDefaultState, fakeComposedEnhancer); // eslint-disable-line max-len
  });

  it('excepts an arbitrary amount of middleware', () => {
    applicationState
      .initialize(fakeReducer, fakeDefaultState, fakeMiddleware, fakeMiddleware);
    expect(Redux.applyMiddleware).toHaveBeenCalledWith(fakeMiddleware, fakeMiddleware);

    applicationState.initialize(fakeReducer, fakeDefaultState);
    expect(Redux.applyMiddleware).toHaveBeenCalledWith();
  });

  it('can return the store', () => {
    applicationState.initialize(fakeReducer, fakeDefaultState, fakeMiddleware);
    expect(applicationState.getStore()).toBe('THIS_IS_THE_FAKE_STORE');
  });

  it('can return the reducer', () => {
    applicationState.initialize(fakeReducer, fakeDefaultState, fakeMiddleware);
    expect(applicationState.getReducer()).toBe('I_AM_THE_REDUCER');
  });

  it('should call Redux.compose if devtool is not on window', () => {
    applicationState.initialize(fakeReducer, fakeDefaultState, fakeMiddleware);
    expect(Redux.compose).toHaveBeenCalledWith(fakeEnhancer);
  });

  it('should use the window __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ if available', () => {
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = jest.fn();

    applicationState.initialize(fakeReducer, fakeDefaultState, fakeMiddleware);
    expect(Redux.compose).not.toHaveBeenCalled();
    expect(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__).toHaveBeenCalledWith(fakeEnhancer);
  });
});
