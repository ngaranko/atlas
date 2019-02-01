import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import DatasetsDetailContainer from './DatasetDetail/DatasetDetail';

const initialState = {
  detail: {
    isLoading: false
  },
  datasets: {
    datasetApiSpecification: {
      data: {}
    }
  },
  user: {},
  location: {
    payload: {
      id: 2
    }
  }
};

describe('DatasetsDetailContainer', () => {
  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<DatasetsDetailContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
