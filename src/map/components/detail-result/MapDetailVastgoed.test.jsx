import React from 'react'
import { shallow } from 'enzyme'

import MapDetailVastgoed from './MapDetailVastgoed'

describe('MapDetailVastgoed', () => {
  it('should render everything', () => {
    const item = {
      label: 'Foo',
      construction_year: '2012',
      status: 'Monument type',
    }

    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailVastgoed
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        item={item}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
