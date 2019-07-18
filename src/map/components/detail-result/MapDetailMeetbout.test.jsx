import React from 'react'
import { shallow } from 'enzyme'

import MapDetailMeetbout from './MapDetailMeetbout'

describe('MapDetailMeetbout', () => {
  it('should render everything', () => {
    const meetbout = {
      address: 'Meetbout address',
      label: 'Meetbout label',
      status: 'Meetbout status',
      zakkingssnelheid: -10.123456,
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailMeetbout
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        meetbout={meetbout}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
