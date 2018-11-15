import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { getSearchQuery } from '../../shared/ducks/data-search/data-search';
import SearchPage from './SearchPage';

jest.mock('../../shared/ducks/data-search/data-search');

const initialState = {
};

describe('SearchPage', () => {
  it('shows map search results if no query is provided', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<SearchPage />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });

  it('shows text search result if query is provided', () => {
    getSearchQuery.mockReturnValue('foo');
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<SearchPage />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
