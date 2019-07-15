import React from 'react'
import { shallow } from 'enzyme'

import LoadingIndicator from './LoadingIndicator'

describe('Checkbox', () => {
  it('should render everything', () => {
    const wrapper = shallow(<LoadingIndicator />)
    expect(wrapper).toMatchSnapshot()
  })
})
