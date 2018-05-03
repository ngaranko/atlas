import React from 'react';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import createSagaMiddleware from 'redux-saga';

import HeaderSearchContainer from './HeaderSearchContainer';
import headerSearchObjects from './HeaderSearch.integration.objects';

import watchFetchSuggestions from '../../../header/sagas/auto-suggest/auto-suggest';
import AutoSuggestReducer from '../../ducks/auto-suggest/auto-suggest';


import { getAuthHeaders } from '../../../shared/services/auth/auth';
jest.mock('../../../shared/services/auth/auth');

// In the code several reducers are combined, resulting in a "key: reducer" structure
// to make sure the state is as much as the running app, we put this one reducer in the same
// structure with the combineReducers
const mainReducer = combineReducers({
  autoSuggest: AutoSuggestReducer
});


const initialState = {
  autoSuggest: {
    count: 0,
    displayQuery: '',
    error: '',
    isLoading: false,
    suggestions: [],
    typedQuery: ''
  }
};

let store;

describe('HeaderSearchContainer', () => {
  beforeEach(() => {
    // mock authentication call, as this is not part of this test scope
    getAuthHeaders.mockImplementation(() => jest.fn());
    // create real store with saga. The code does not seem to update a mock-store correctly
    const sagaMiddleware = createSagaMiddleware();
    const enhancer = compose(
      applyMiddleware(sagaMiddleware)
    );
    store = createStore(mainReducer, initialState, enhancer);
    // Only run the saga which is in scope for this test
    sagaMiddleware.run(watchFetchSuggestions);
  });

  afterEach(() => {
  });

  it('goes updates the state accordingly to the input action', () => {
    fetch.mockResponse(JSON.stringify(headerSearchObjects.mockFetchResponse), { status: 200 });

    let storeHaseBeenCalledTimes = 0;
    store.subscribe(() => {
      storeHaseBeenCalledTimes += 1;
      switch (storeHaseBeenCalledTimes) {
        case 1:
          // first state change is from the REQUEST
          expect(store.getState()).toMatchSnapshot();
          break;
        case 2:
          // second state change is from the SUCCESS (with suggestions)
          expect(store.getState()).toMatchSnapshot();
          break;
        default:
          break;
      }
    });

    const headerSearch = mount(<HeaderSearchContainer />, { context: { store } });

    const input = headerSearch.find('input');
    input.simulate('focus');
    input.instance().value = 'dijk';
    input.simulate('change');
  });
});
