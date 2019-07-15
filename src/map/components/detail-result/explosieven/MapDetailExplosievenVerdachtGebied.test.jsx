import React from 'react'
import { shallow } from 'enzyme'

import MapDetailExplosievenVerdachtGebied from './MapDetailExplosievenVerdachtGebied'

describe('MapDetailExplosievenVerdachtGebied', () => {
  it('should render everything', () => {
    const verdachtGebied = {
      label: 'Verdacht gebied label',
      remarks: 'Verdacht gebied remarks',
      subType: 'Verdacht gebied sub type',
      type: 'Verdacht gebied type',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailExplosievenVerdachtGebied
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verdachtGebied={verdachtGebied}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
