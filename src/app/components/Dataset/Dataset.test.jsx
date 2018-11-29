import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Dataset from './Dataset';

const initialState = {
  filters: {},
  user: {},
  datasets: {
    datasetData: {
      isLoading: false,
      page: 1,
      authError: false
    },
    datasetApiSpecification: {
      isLoading: false,
      error: null,
      data: {}
    }
  },
  dataSearch: {
    query: ''
  }
};

// Todo: properly test this
describe.only('Dataset', () => {
  it('should render the inital state', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<Dataset />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
