import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import DataSearchLocation from './DataSearchLocation';

const initialState = {
  dataSearch: {
    resultsMap: []
  }
};

describe('DataSearchLocation', () => {
  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<DataSearchLocation />, { context: { store } });
    expect(component).toMatchSnapshot();
  });
});
