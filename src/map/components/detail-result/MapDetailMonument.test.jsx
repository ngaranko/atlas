import React from 'react'
import { shallow } from 'enzyme'

import MapDetailMonument from './MapDetailMonument'

describe('MapDetailMonument', () => {
  it('should render everything', () => {
    const monument = {
      label: 'Monument label',
      number: 123456,
      status: 'Monument status',
      type: 'Monument type',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailMonument
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        monument={monument}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
