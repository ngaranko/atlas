import React from 'react'
import { shallow } from 'enzyme'

import MapDetailGebiedenBouwblok from './MapDetailGebiedenBouwblok'

describe('MapDetailGebiedenBouwblok', () => {
  it('should render everything', () => {
    const bouwblok = {
      label: 'Bouwblok label',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailGebiedenBouwblok
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        bouwblok={bouwblok}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
