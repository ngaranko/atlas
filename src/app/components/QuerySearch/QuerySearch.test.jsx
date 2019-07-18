import React from 'react'
import { shallow } from 'enzyme'
import QuerySearch from './QuerySearch'

jest.mock('../../pages', () => ({
  PAGES: {
    SEARCH_DATASETS: 'datasets',
    DATA_QUERY_SEARCH: 'data',
  },
}))

describe('QuerySearch', () => {
  const props = {
    currentPage: 'data',
    filters: {},
    isLoading: true,
    user: {
      scopes: [],
    },
    numberOfResults: 0,
    numberOfDataResults: 0,
    numberOfDatasetResults: 0,
    toDataPage: jest.fn(),
    toDatasetPage: jest.fn(),
  }

  it('should not render while loading', () => {
    const component = shallow(<QuerySearch {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('should render with results', () => {
    const extendedProps = {
      ...props,
      isLoading: false,
      numberOfResults: 2,
      numberOfDataResults: 1,
      numberOfDatasetResults: 1,
    }
    const component = shallow(<QuerySearch {...extendedProps} />)
    expect(component).toMatchSnapshot()
  })

  it('should fetch all data results on tab click', () => {
    const extendedProps = {
      ...props,
      isLoading: false,
      numberOfResults: 2,
      numberOfDataResults: 1,
      numberOfDatasetResults: 1,
    }
    const component = shallow(<QuerySearch {...extendedProps} />)

    component
      .find('Tab')
      .at(0)
      .simulate('click')
    expect(props.toDataPage).toHaveBeenCalled()
  })

  it('should fetch all dataset results on tab click', () => {
    const extendedProps = {
      ...props,
      currentPage: 'datasets',
      isLoading: false,
      numberOfResults: 2,
      numberOfDataResults: 1,
      numberOfDatasetResults: 1,
    }
    const component = shallow(<QuerySearch {...extendedProps} />)

    component
      .find('Tab')
      .at(1)
      .simulate('click')
    expect(props.toDatasetPage).toHaveBeenCalled()
  })
})
