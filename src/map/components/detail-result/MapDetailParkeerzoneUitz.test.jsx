import React from 'react'
import { shallow } from 'enzyme'
import MapDetailParkeerzoneUitz from './MapDetailParkeerzoneUitz'

describe('MapDetailParkeerzoneUitz', () => {
  it('should render everything', () => {
    const item = {
      label: 'Uitz Parkeerzone',
      description: 'This is a ...',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailParkeerzoneUitz
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        item={item}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
