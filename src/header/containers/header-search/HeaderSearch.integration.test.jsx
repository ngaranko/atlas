import React from 'react';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import createSagaMiddleware from 'redux-saga';

import HeaderSearchContainer from './HeaderSearchContainer';
import headerSearchObjects from './HeaderSearch.integration.objects';

import watchFetchSuggestions from '../../../header/sagas/auto-suggest/auto-suggest';
import AutoSuggestReducer from '../../ducks/auto-suggest/auto-suggest';
import DataSelectionReducer from '../../../shared/ducks/data-selection/data-selection';

import { getAuthHeaders } from '../../../shared/services/auth/auth';

import * as search from '../../../reducers/search';
import * as details from '../../../reducers/details';

jest.mock('../../../shared/services/auth/auth');

// In the code several reducers are combined, resulting in a "key: reducer" structure
// to make sure the state is as much as the running app, we put this one reducer in the same
// structure with the combineReducers
const mainReducer = combineReducers({
  autoSuggest: AutoSuggestReducer
});

let store;
let enhancer;

describe('HeaderSearchContainer', () => {
  beforeEach(() => {
    global._paq = []; // eslint-disable-line no-underscore-dangle
    // mock authentication call, as this is not part of this test scope
    getAuthHeaders.mockImplementation(() => jest.fn());
    // create real store with saga. The code does not seem to update a mock-store correctly
    const sagaMiddleware = createSagaMiddleware();
    enhancer = compose(
      applyMiddleware(sagaMiddleware)
    );
    store = createStore(mainReducer, {}, enhancer);
    // Only run the saga which is in scope for this test
    sagaMiddleware.run(watchFetchSuggestions);

    fetch.mockResponse(JSON.stringify(headerSearchObjects.mockFetchResponse), { status: 200 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates the state accordingly to the input action', () => {
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

  describe('calls upon the correct reducer on search', () => {
    it('regular search', () => {
      jest.spyOn(search, 'fetchSearchResultsByQuery');
      jest.spyOn(search, 'fetchDataSelection');
      jest.spyOn(store, 'dispatch');

      const headerSearch = mount(<HeaderSearchContainer />, { context: { store } });

      const input = headerSearch.find('input');
      input.simulate('focus');
      input.instance().value = 'dijk';
      input.simulate('change');

      const submit = headerSearch.find('form');
      submit.simulate('submit');

      expect(store.dispatch).toHaveBeenCalled();
      expect(search.fetchSearchResultsByQuery).toHaveBeenCalledWith('dijk');
      expect(search.fetchDataSelection).not.toHaveBeenCalled();
    });

    it('dataset search', () => {
      // override the store set in the beforeEach(), as we need
      // the dataSelection value for this test
      const combinedReducer = combineReducers({
        autoSuggest: AutoSuggestReducer,
        dataSelection: DataSelectionReducer
      });

      const newState = {
        dataSelection: {
          view: 'CARDS'
        }
      };
      store = createStore(combinedReducer, newState, enhancer);

      jest.spyOn(search, 'fetchSearchResultsByQuery');
      jest.spyOn(search, 'fetchDataSelection');
      jest.spyOn(store, 'dispatch');

      const headerSearch = mount(<HeaderSearchContainer />, { context: { store } });

      const input = headerSearch.find('input');
      input.simulate('focus');
      input.instance().value = 'dijk';
      input.simulate('change');

      const submit = headerSearch.find('form');
      submit.simulate('submit');


      expect(store.dispatch).toHaveBeenCalled();
      expect(search.fetchDataSelection).toHaveBeenCalledWith('dijk');
      expect(search.fetchSearchResultsByQuery).not.toHaveBeenCalled();
    });
  });

  it('allows the user to use the keyboard to navigate and select suggestions', (done) => {
    jest.spyOn(details, 'fetchDetail');
    const headerSearch = mount(<HeaderSearchContainer />, { context: { store } });

    const input = headerSearch.find('input');
    input.simulate('focus');
    input.instance().value = 'dijk';
    input.simulate('input');
    input.simulate('change');
    input.simulate('focus');

    // timeout to ensure all async actions are done
    setTimeout(() => {
      headerSearch.update();
      expect(headerSearch).toMatchSnapshot();
      input.simulate('keyDown', { key: 'Down arrow', keyCode: 40, which: 40 });
      headerSearch.update();
      expect(headerSearch).toMatchSnapshot(); // first suggestion is active
      input.simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });
      headerSearch.update();
      expect(details.fetchDetail)
      .toHaveBeenCalledWith('https://acc.api.data.amsterdam.nl/bag/openbareruimte/03630000001528/');
      done();
    }, 250);
  });

  it('allows the user to use the keyboard to dismiss the suggestions', (done) => {
    const headerSearch = mount(<HeaderSearchContainer />, { context: { store } });

    const input = headerSearch.find('input');
    input.simulate('focus');
    input.instance().value = 'dijk';
    input.simulate('input');
    input.simulate('change');
    input.simulate('focus');

    // timeout to ensure all async actions are done
    setTimeout(() => {
      headerSearch.update();
      expect(headerSearch).toMatchSnapshot(); // suggestions are visible
      input.simulate('keyDown', { key: 'escape', keyCode: 27, which: 27 });
      headerSearch.update();
      expect(headerSearch).toMatchSnapshot(); // suggestions are not visible
      done();
    }, 250);
  });
});
