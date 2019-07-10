import React from 'react'
import { shallow } from 'enzyme'

import MapDetailAdressenPand from './MapDetailAdressenPand'

describe('MapDetailAdressenPand', () => {
  it('should render everything', () => {
    const pand = {
      label: 'Pand label',
      status: {
        omschrijving: 'Pand status',
        code: '31',
      },
      name: 'Gebouw!',
      year: '2020',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailAdressenPand
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        pand={pand}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render unknown for empty year and empty name', () => {
    const pand = {
      label: 'Pand label',
      status: {
        omschrijving: 'Pand status',
        code: '31',
      },
      year: '',
      name: '',
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailAdressenPand
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        pand={pand}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render unknown without year and name', () => {
    const pand = {
      label: 'Pand label',
      status: {
        omschrijving: 'Pand status',
        code: '31',
      },
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailAdressenPand
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        pand={pand}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
