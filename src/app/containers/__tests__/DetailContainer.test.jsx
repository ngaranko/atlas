import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import DetailContainer from '../DetailContainer';

const initialState = {
  detail: {
    reload: false,
    isLoading: false,
    skippedSearchResults: false,
    endpoint: ''
  },
  catalogFilters: '',
  user: {}
};

describe('DetailContainer', () => {
  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<DetailContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
