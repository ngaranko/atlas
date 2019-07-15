import React from 'react'
import { shallow } from 'enzyme'

import MapDetailAdressenOpenbareRuimte from './MapDetailAdressenOpenbareRuimte'

describe('MapDetailAdressenOpenbareRuimte', () => {
  it('should render everything', () => {
    const openbareRuimte = {
      label: 'Korte Oude Nieuwe Kromme Lange Hoogstraat',
      status: {
        code: '',
        description: 'Openbare ruimte status',
      },
      type: 'Openbare ruimte type',
      nenName: 'Ko Ou Ni Kr La Hoogstr',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailAdressenOpenbareRuimte
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        openbareRuimte={openbareRuimte}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
