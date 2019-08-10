import React from 'react'
import { shallow } from 'enzyme'
import HelpLink from './HelpLink'

describe('HelpLink', () => {
  it('should render everything', () => {
    const component = shallow(<HelpLink />)
    expect(component).toMatchSnapshot()
  })
})
