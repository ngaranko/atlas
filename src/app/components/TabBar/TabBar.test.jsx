import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import TabBar from './TabBar';
import TabBarContainer from './TabBarContainer';

describe('TabBar', () => {
  const initialState = {
    dataSearch: {
      query: 'dam'
    }
  };

  it('should render the container', () => {
    const store = configureMockStore()({ ...initialState });
    const props = {
      // searchQuery: 'dam'
    };
    const component = shallow(<TabBarContainer {...props} />, { context: { store } });
    expect(component).toMatchSnapshot();
  });


  it('should render the component with results', () => {
    const props = {
      searchQuery: 'dam',
      showDatasetsButton: true,
      totalNumberOfResults: 424,
      goToDatasets: jest.fn()
    };

    const component = shallow(<TabBar {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render the component with no results', () => {
    const props = {
      searchQuery: 'dam',
      showDatasetsButton: false,
      totalNumberOfResults: 0,
      goToDatasets: jest.fn()
    };

    const component = shallow(<TabBar {...props} />);
    expect(component).toMatchSnapshot();
  });
});
