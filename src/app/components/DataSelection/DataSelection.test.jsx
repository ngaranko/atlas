import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import DataSelection from './DataSelection';
import { DATASETS, VIEWS } from '../../../shared/ducks/data-selection/constants';

const initialState = {
  filter: { filters: {} },
  user: {},
  dataSelection: {
    isLoading: true,
    markers: [],
    geometryFilter: {
      markers: []
    },
    dataset: DATASETS.BAG,
    view: VIEWS.TABLE,
    authError: false,
    errorMessage: '',
    page: 1
  }
};

describe('DataSelection', () => {
  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<DataSelection />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
