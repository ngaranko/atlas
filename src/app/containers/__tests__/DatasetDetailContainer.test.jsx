import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CatalogDetailContainer from '../DatasetsDetailContainer';

const initialState = {
  detail: {
    isLoading: false
  },
  catalog: {
    detail: 'foo'
  },
  datasets: {
    datasetApiSpecification: {
      data: {}
    }
  },
  user: {},
  location: {
    payload: {
      id: 1
    }
  }
};

describe('CatalogDetailContainer', () => {
  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const component = shallow(<CatalogDetailContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
