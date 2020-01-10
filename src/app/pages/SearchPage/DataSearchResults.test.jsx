import React from 'react'
import { shallow } from 'enzyme'
import DataSearchResults from './DataSearchResults'

describe('DataSearchResults', () => {
  it('shows the compact card component', () => {
    const component = shallow(
      <DataSearchResults
        compact
        results={[
          {
            count: 1,
            results: [1, 2, 3],
          },
        ]}
      />,
    )

    expect(component.find('MoreResultsWhenLoggedIn').exists()).toBeFalsy()
    expect(component.find('DataCard').exists()).toBeTruthy()
  })

  it('shows the list card component', () => {
    const component = shallow(
      <DataSearchResults
        results={[
          {
            count: 1,
            results: [1, 2, 3],
          },
        ]}
      />,
    )

    expect(component.find('MoreResultsWhenLoggedIn').exists()).toBeFalsy()
    expect(component.find('DataList').exists()).toBeTruthy()
  })

  it('shows the list card component with unauthorized message', () => {
    const component = shallow(
      <DataSearchResults
        errors={[{ code: 'UNAUTHORIZED', label: 'foo' }]}
        results={[
          {
            count: 1,
            results: [1, 2, 3],
          },
        ]}
      />,
    )

    const unauthorizedMessage = component.find('MoreResultsWhenLoggedIn')

    expect(unauthorizedMessage.exists()).toBeTruthy()
    expect(unauthorizedMessage.props()).toMatchObject({
      excludedResults: 'foo',
    })
  })

  it('shows the no results component', () => {
    let component
    component = shallow(<DataSearchResults results={[]} />)

    expect(component.find('NoDataSearchResults').exists()).toBeTruthy()

    // Or no component at all
    component = shallow(
      <DataSearchResults
        results={[
          {
            count: 1,
            results: [],
          },
        ]}
      />,
    )

    expect(component.find('DataList').exists()).toBeFalsy()
  })
})
