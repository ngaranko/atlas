import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import HeaderSearchContainer from './HeaderSearchContainer';
import {
  setActiveSuggestion,
  getSuggestions
} from '../../ducks/auto-suggest/auto-suggest';

import { fetchDataSelection, fetchSearchResultsByQuery } from '../../../reducers/search';

import { fetchDetail } from '../../../reducers/details';
import piwikTracker from '../../../shared/services/piwik-tracker/piwik-tracker';

jest.mock('../../ducks/auto-suggest/auto-suggest');
jest.mock('../../../reducers/details');
jest.mock('../../../shared/services/piwik-tracker/piwik-tracker');
jest.mock('../../../reducers/search');

describe('HeaderSearchContainer', () => {
  beforeEach(() => {
    setActiveSuggestion.mockImplementation(() => ({ type: 'SET_ACTIVE_SUGGESTION' }));
    getSuggestions.mockImplementation(() => ({ type: 'FETCH_SUGGESTIONS_REQUEST' }));
    fetchDetail.mockImplementation((endpoint) => ({ type: 'FETCH_DETAIL', payload: endpoint }));
    piwikTracker.mockImplementation(() => jest.fn());
    fetchDataSelection.mockImplementation((query) => ({ type: 'FETCH_DATA_SELECTION', payload: query }));
    fetchSearchResultsByQuery.mockImplementation((query) => ({ type: 'FETCH_SEARCH_RESULTS_BY_QUERY', payload: query }));
  });

  afterEach(() => {
    setActiveSuggestion.mockReset();
    getSuggestions.mockReset();
    fetchDetail.mockReset();
    piwikTracker.mockReset();
    fetchDataSelection.mockReset();
    fetchSearchResultsByQuery.mockReset();
  });

  const initialState = {
    autoSuggest: {
      suggestions: {
        count: 6,
        data: [
          {
            content: [
              {
                uri: 'bag/openbareruimte/03630000003186/',
                label: 'Dam',
                index: 0
              },
              {
                uri: 'bag/openbareruimte/03630000001038/',
                label: 'Damloperspad',
                index: 1
              },
              {
                uri: 'bag/openbareruimte/03630000003187/',
                label: 'Damrak',
                index: 2
              }
            ],
            label: 'Straatnamen'
          },
          {
            content: [
              {
                uri: 'monumenten/monumenten/8e8ae1dd-78a2-4a5f-841d-1870631b7e33/',
                label: 'Damrak 1',
                index: 3
              },
              {
                uri: 'monumenten/monumenten/aa3f9081-2ac4-49ea-95d2-0aad7aecd883/',
                label: 'Dam 10',
                index: 4
              },
              {
                uri: 'monumenten/monumenten/f93e31ba-89eb-4784-87e1-d32c33b5236d/',
                label: 'Damrak 15',
                index: 5
              }
            ],
            label: 'Monumenten'
          }
        ],
        query: 'dam'
      }
    }
  };

  it('does nothing on initial load', () => {
    const store = configureMockStore()({ ...initialState });
    jest.spyOn(store, 'dispatch');
    shallow(<HeaderSearchContainer />, { context: { store } }).dive();

    expect(setActiveSuggestion).not.toHaveBeenCalled();
    expect(getSuggestions).not.toHaveBeenCalled();
    expect(fetchDetail).not.toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  describe('onSuggestSelection', () => {
    it('does the fetch detail dispatch upon called', () => {
      const store = configureMockStore()({ ...initialState });
      const selectedSuggestion = {
        uri: 'bag/openbareruimte/03630000001038/',
        label: 'Damloperspad',
        index: 1
      };

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: false,
        metaKey: false
      };

      jest.spyOn(store, 'dispatch');
      const headerSearch = shallow(<HeaderSearchContainer />, { context: { store } }).dive();

      headerSearch.instance().onSuggestSelection(selectedSuggestion, mockEvent);

      expect(fetchDetail).toHaveBeenCalled();

      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'FETCH_DETAIL',
        payload: 'https://acc.api.data.amsterdam.nl/bag/openbareruimte/03630000001038/'
      });
    });

    it('does call to open new window if ctrl key is pressed', () => {
      const store = configureMockStore()({ ...initialState });
      const selectedSuggestion = {
        uri: 'bag/openbareruimte/03630000001038/',
        label: 'Damloperspad',
        index: 1
      };

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: true,
        metaKey: false
      };

      jest.spyOn(store, 'dispatch');
      global.open = () => {
        return {
          window: {}
        }
      };
      jest.spyOn(global, 'open');

      const headerSearch = shallow(<HeaderSearchContainer />, { context: { store } }).dive();

      headerSearch.instance().onSuggestSelection(selectedSuggestion, mockEvent);

      expect(fetchDetail).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(global.open).toHaveBeenCalled();
    });
  });

  describe('onFormSubmit', () => {
    it('does no call if there is an active suggestion', () => {
      const store = configureMockStore()({
        ...initialState,
        autoSuggest: {
          activeSuggestion: {
            uri: 'monumenten/monumenten/8e8ae1dd-78a2-4a5f-841d-1870631b7e33/',
            label: 'Damrak 1',
            index: 3
          }
        },
        dataSelection: {
          view: 'NOT_CARDS'
        }
      });

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: false,
        metaKey: false
      };
      jest.spyOn(store, 'dispatch');
      const headerSearch = shallow(<HeaderSearchContainer />, { context: { store } }).dive();

      headerSearch.instance().onFormSubmit(mockEvent);

      expect(fetchDataSelection).not.toHaveBeenCalled();
      expect(fetchSearchResultsByQuery).not.toHaveBeenCalled();
    });

    it('does the "fetchSearchResultsByQuery" call', () => {
      const store = configureMockStore()({
        ...initialState,
        autoSuggest: {
          activeSuggestion: {
            index: -1
          }
        },
        dataSelection: {
          view: 'NOT_CARDS'
        }
      });

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: false,
        metaKey: false
      };
      jest.spyOn(store, 'dispatch');
      const headerSearch = shallow(<HeaderSearchContainer />, { context: { store } }).dive();

      headerSearch.instance().onFormSubmit(mockEvent);

      expect(fetchDataSelection).not.toHaveBeenCalled();
      expect(fetchSearchResultsByQuery).toHaveBeenCalled();
    });

    it('does the "fetchDataSelection" call', () => {
      const store = configureMockStore()({
        ...initialState,
        autoSuggest: {
          activeSuggestion: {
            index: -1
          }
        },
        dataSelection: {
          view: 'CARDS'
        }
      });

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: false,
        metaKey: false
      };
      jest.spyOn(store, 'dispatch');
      const headerSearch = shallow(<HeaderSearchContainer />, { context: { store } }).dive();

      headerSearch.instance().onFormSubmit(mockEvent);

      expect(fetchDataSelection).toHaveBeenCalled();
      expect(fetchSearchResultsByQuery).not.toHaveBeenCalled();
    });
  });
});
