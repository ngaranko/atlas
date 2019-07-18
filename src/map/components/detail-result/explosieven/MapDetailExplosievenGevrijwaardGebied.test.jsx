import React from 'react'
import { shallow } from 'enzyme'

import MapDetailExplosievenGevrijwaardGebied from './MapDetailExplosievenGevrijwaardGebied'

describe('MapDetailExplosievenGevrijwaardGebied', () => {
  it('should render everything', () => {
    const gevrijwaardGebied = {
      date: new Date('1919-12-31'),
      label: 'Gevrijwaard gebied label',
      remarks: 'Gevrijwaard gebied remarks',
      source: 'Gevrijwaard gebied source',
      type: 'Gevrijwaard gebied type',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailExplosievenGevrijwaardGebied
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        gevrijwaardGebied={gevrijwaardGebied}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
