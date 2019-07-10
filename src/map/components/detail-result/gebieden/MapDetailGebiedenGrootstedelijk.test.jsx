import React from 'react'
import { shallow } from 'enzyme'

import MapDetailGebiedenGrootstedelijk from './MapDetailGebiedenGrootstedelijk'

describe('MapDetailGebiedenGrootstedelijk', () => {
  it('should render everything', () => {
    const grootstedelijk = {
      label: 'Grootstedelijk label',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailGebiedenGrootstedelijk
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        grootstedelijk={grootstedelijk}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
