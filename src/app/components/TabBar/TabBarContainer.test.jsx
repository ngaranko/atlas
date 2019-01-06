import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import TabBarContainer from './TabBarContainer';

const initialState = {
  dataSearch: {
    // geoSearch: {}
    query: 'dam'
  }
};

describe('TabBarContainer', () => {
  it('should render the container with the basic properties', () => {
    const store = configureMockStore()({ ...initialState });
    const props = {
      // searchQuery: 'dam'
    };
    const component = shallow(<TabBarContainer {...props} />, { context: { store } });
    expect(component).toMatchSnapshot();
  });
});
