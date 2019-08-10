import React from 'react'
import { shallow } from 'enzyme'
import HelpLink from './HelpLink'
import { routing } from '../../../routes'

describe('HelpLink', () => {
  describe('LoginLinkContainer', () => {
    beforeEach(() => {})

    it('should render everything', () => {
      const component = shallow(<HelpLink />)

      const Link = component.find('Connect(Link)').at(0)
      expect(Link.exists()).toBeTruthy()
      expect(Link.props().to.type).toEqual(routing.bediening.type)
    })
  })
})
