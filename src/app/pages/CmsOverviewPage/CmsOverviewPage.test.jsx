import React from 'react'
import { shallow } from 'enzyme'
import CmsOverviewPage from './CmsOverviewPage'

describe('CmsOverviewPage', () => {
  it('should render the correct title', () => {
    const component = shallow(<CmsOverviewPage type="ARTICLES" />)

    expect(component.find('Heading').props().children).toBe('Artikelen')
  })
})
