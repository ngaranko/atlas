import React from 'react'
import { shallow } from 'enzyme'
import MapDetailParkeerzone from './MapDetailParkeerzone'

describe('MapDetailParkeerzone', () => {
  it('should render everything', () => {
    const item = {
      label: 'Parkeerzone',
      description: 'This is a ...',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailParkeerzone
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        item={item}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
