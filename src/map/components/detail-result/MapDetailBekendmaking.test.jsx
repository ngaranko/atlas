import React from 'react'
import { shallow } from 'enzyme'

import MapDetailBekendmaking from './MapDetailBekendmaking'

describe('MapDetailBekendmaking', () => {
  it('should render everything', () => {
    const bekendmaking = {
      titel: 'Dit is een bekendmaking',
      datum: '12-12-2012',
      url: 'https://bekendmaking/link',
      label: 'Bekendmaking label',
      categorie: 'test categorie',
      onderwerp: 'test onderwerp',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailBekendmaking
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        bekendmaking={bekendmaking}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
