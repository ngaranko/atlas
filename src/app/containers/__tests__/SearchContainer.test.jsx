import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import SearchContainer from '../SearchContainer';

import { getShortSelectedLocation } from '../../../map/ducks/map/map-selectors';

jest.mock('../../../map/ducks/map/map-selectors');

const initialState = {
  dataSearch: {
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
    getShortSelectedLocation.mockImplementation(() => ({
      latitude: 321,
      longitude: 123
    }));
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<SearchContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
