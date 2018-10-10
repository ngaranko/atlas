import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import SearchContainer from '../SearchContainer';

const initialState = {
  search: {
    isLoading: false,
    numberOfResults: 12
  },
  map: {
    selectedLocation: '321,123'
  },
  user: {}
};

describe('SearchContainer', () => {
  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<SearchContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
