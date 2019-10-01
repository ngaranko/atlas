import React from 'react'
import { shallow } from 'enzyme'
import { FooterLinkListItem } from '@datapunt/asc-ui'
import SocialLinks from './SocialLinks'

describe('SocialLinks', () => {
  let component
  beforeEach(() => {
    component = shallow(<SocialLinks />)
  })

  it('should render all links', () => {
    expect(component.find(FooterLinkListItem).length).toEqual(5)
  })
})
