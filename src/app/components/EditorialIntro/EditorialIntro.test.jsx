import React from 'react'
import { shallow } from 'enzyme'
import EditorialIntro from './EditorialIntro'

describe('EditorialIntro', () => {
  it('should render the component', () => {
    const component = shallow(<EditorialIntro />).dive()
    expect(component.find('p')).toBeTruthy()
  })
})
