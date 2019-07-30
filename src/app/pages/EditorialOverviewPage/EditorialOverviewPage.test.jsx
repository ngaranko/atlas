import React from 'react'
import { shallow } from 'enzyme'
import EditorialOverviewPage from './EditorialOverviewPage'

describe('EditorialOverviewPage', () => {
  it('should render the correct title', () => {
    const component = shallow(<EditorialOverviewPage type="ARTICLES" />)

    expect(component.find('Heading').props().children).toBe('Artikelen')
  })
})
