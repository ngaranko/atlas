import React from 'react';
import { shallow } from 'enzyme';
import TabBar from './TabBar';

describe('TabBar', () => {
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
