import React from 'react'
import { shallow } from 'enzyme'

import MapDetailKadastraalObject from './MapDetailKadastraalObject'

describe('MapDetailKadastraalObject', () => {
  it('should render everything', () => {
    const kadastraalObject = {
      kadastraleGemeente: {
        label: 'Kadastrale gemeente label',
        name: 'Kadastrale gemeente name',
        gemeente: 'Gemeentenaam!',
      },
      label: 'Kadastraal object label',
      objectNumber: '123ABC',
      size: 115,
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailKadastraalObject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        kadastraalObject={kadastraalObject}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render without kadastrale gemeente', () => {
    const kadastraalObject = {
      label: 'Kadastraal object label',
      objectNumber: '123ABC',
      size: 115,
      kadastraleGemeente: {},
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailKadastraalObject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        kadastraalObject={kadastraalObject}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with zero value for size', () => {
    const kadastraalObject = {
      label: 'Kadastraal object label',
      objectNumber: '123ABC',
      size: 0,
      kadastraleGemeente: {},
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailKadastraalObject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        kadastraalObject={kadastraalObject}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should not render size', () => {
    const kadastraalObject = {
      label: 'Kadastraal object label',
      objectNumber: '123ABC',
      kadastraleGemeente: {},
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailKadastraalObject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        kadastraalObject={kadastraalObject}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
