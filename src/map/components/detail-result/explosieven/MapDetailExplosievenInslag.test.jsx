import React from 'react'
import { shallow } from 'enzyme'

import MapDetailExplosievenInslag from './MapDetailExplosievenInslag'

describe('MapDetailExplosievenInslag', () => {
  it('should render everything', () => {
    const inslag = {
      date: new Date('1980-08-19'),
      label: 'Inslag label',
      remarks: 'Inslag remarks',
      source: 'Inslag source',
      type: 'Inslag type',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailExplosievenInslag
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        inslag={inslag}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
