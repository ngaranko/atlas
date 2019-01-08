import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import DataSearchQuery from './DataSearchQuery';

const initialState = {
  dataSearch: {
    resultsQuery: []
  }
};

describe('DataSearchQuery', () => {
  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<DataSearchQuery />, { context: { store } });
    expect(component).toMatchSnapshot();
  });
});
