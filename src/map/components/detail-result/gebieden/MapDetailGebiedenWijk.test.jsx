import React from 'react'
import { shallow } from 'enzyme'

import MapDetailGebiedenWijk from './MapDetailGebiedenWijk'

describe('MapDetailGebiedenWijk', () => {
  it('should render everything', () => {
    const wijk = {
      label: 'Wijk label',
      volledigeCode: 'A',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailGebiedenWijk
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        wijk={wijk}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
