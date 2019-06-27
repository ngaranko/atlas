import React from 'react'
import { shallow } from 'enzyme'

import MapDetailExplosievenUitgevoerdOnderzoek from './MapDetailExplosievenUitgevoerdOnderzoek'

describe('MapDetailExplosievenUitgevoerdOnderzoek', () => {
  it('should render everything', () => {
    const uitgevoerdOnderzoek = {
      date: new Date('1919-12-31'),
      label: 'Uitgevoerd onderzoek label',
      onderzoeksgebied: 'Uitgevoerd onderzoek onderzoeksgebied',
      type: 'Uitgevoerd onderzoek type',
      verdachtGebied: 'Uitgevoerd onderzoek verdacht gebied',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailExplosievenUitgevoerdOnderzoek
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        uitgevoerdOnderzoek={uitgevoerdOnderzoek}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
