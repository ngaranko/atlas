import React from 'react';
import { shallow } from 'enzyme';
import SearchList from './SearchList';

describe('SearchList', () => {
  it('should render a results list', () => {
    const props = {
      categoryResults: {
        results: [
          {
            label: 'Dam 1',
            endpoint: 'https://acc.api.data.amsterdam.nl/bag/verblijfsobject/03630003761571/'
          },
          {
            label: 'Dam 2',
            endpoint: 'https://acc.api.data.amsterdam.nl/bag/verblijfsobject/03630011909911/'
          }
        ]
      },
      fetchMoreResults: jest.fn(),
      hasLoadMore: null,
      limit: 10
    };

    const component = shallow(
      <SearchList {...props} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render an empty list ', () => {
    const props = {
      categoryResults: { },
      fetchMoreResults: jest.fn(),
      hasLoadMore: null,
      limit: 10
    };

    const component = shallow(
      <SearchList {...props} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render the Toon meer button when the hasLoadMore flag is set ', () => {
    const props = {
      categoryResults: { },
      fetchMoreResults: jest.fn(),
      hasLoadMore: true,
      limit: 10
    };

    const component = shallow(
      <SearchList {...props} />
    );
    expect(component).toMatchSnapshot();
  });
});
