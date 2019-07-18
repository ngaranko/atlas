import React from 'react'
import { shallow } from 'enzyme'

import MapDetailAdressenVerblijfsobject from './MapDetailAdressenVerblijfsobject'

describe('MapDetailAdressenVerblijfsobject', () => {
  it('should render everything', () => {
    const verblijfsobject = {
      eigendomsverhouding: 'Verblijfsobject eigendomsverhouding',
      gebruiksdoelen: [
        {
          code: '01',
          description: 'Gebruiksdoel description 1',
        },
        {
          code: '0400',
          description: 'Gebruiksdoel description 2',
          descriptionPlus: 'Gebruiksdoel description plus',
        },
      ],
      label: 'Verblijfsobject label',
      size: 15,
      status: {
        description: 'Status omschrijving',
        code: '18',
      },
      use: {
        code: '100',
        description: 'horeca',
      },
      isNevenadres: false,
      indicatieGeconstateerd: true,
      aanduidingInOnderzoek: true,
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailAdressenVerblijfsobject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verblijfsobject={verblijfsobject}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render unknown with zero value for size', () => {
    const verblijfsobject = {
      eigendomsverhouding: 'Verblijfsobject eigendomsverhouding',
      gebruiksdoelen: [
        {
          code: '01',
          description: 'Gebruiksdoel description 1',
        },
        {
          code: '0400',
          description: 'Gebruiksdoel description 2',
          descriptionPlus: 'Gebruiksdoel description plus',
        },
      ],
      label: 'Verblijfsobject label',
      size: 0,
      status: {
        description: 'Status omschrijving',
        code: '19',
      },
      use: {
        code: '100',
        description: 'horeca',
      },
      isNevenadres: false,
      indicatieGeconstateerd: true,
      aanduidingInOnderzoek: true,
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailAdressenVerblijfsobject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verblijfsobject={verblijfsobject}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render unknown without size', () => {
    const verblijfsobject = {
      eigendomsverhouding: 'Verblijfsobject eigendomsverhouding',
      gebruiksdoelen: [
        {
          code: '01',
          description: 'Gebruiksdoel description 1',
        },
        {
          code: '0400',
          description: 'Gebruiksdoel description 2',
          descriptionPlus: 'Gebruiksdoel description plus',
        },
      ],
      label: 'Verblijfsobject label',
      type: 'Verblijfsobject type',
      status: {
        description: 'Status omschrijving',
        code: '20',
      },
      use: {
        code: '100',
        description: 'horeca',
      },
      isNevenadres: false,
      indicatieGeconstateerd: true,
      aanduidingInOnderzoek: true,
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailAdressenVerblijfsobject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verblijfsobject={verblijfsobject}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render `Nee` if is nevenadres is `true` and show a blue bullet', () => {
    const verblijfsobject = {
      eigendomsverhouding: 'Verblijfsobject eigendomsverhouding',
      gebruiksdoelen: [
        {
          code: '01',
          description: 'Gebruiksdoel description 1',
        },
        {
          code: '0400',
          description: 'Gebruiksdoel description 2',
          descriptionPlus: 'Gebruiksdoel description plus',
        },
      ],
      label: 'Verblijfsobject label',
      type: 'Verblijfsobject type',
      status: {
        description: 'Status omschrijving',
        code: '21',
      },
      use: {
        code: '100',
        description: 'horeca',
      },
      isNevenadres: true,
      indicatieGeconstateerd: true,
      aanduidingInOnderzoek: true,
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailAdressenVerblijfsobject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verblijfsobject={verblijfsobject}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render `Nee` if aanduiding in onderzoek is `false` and show a red bullet', () => {
    const verblijfsobject = {
      eigendomsverhouding: 'Verblijfsobject eigendomsverhouding',
      gebruiksdoelen: [
        {
          code: '01',
          description: 'Gebruiksdoel description 1',
        },
        {
          code: '0400',
          description: 'Gebruiksdoel description 2',
          descriptionPlus: 'Gebruiksdoel description plus',
        },
      ],
      label: 'Verblijfsobject label',
      type: 'Verblijfsobject type',
      status: {
        description: 'Status omschrijving',
        code: '22',
      },
      use: {
        code: '100',
        description: 'horeca',
      },
      isNevenadres: false,
      indicatieGeconstateerd: true,
      aanduidingInOnderzoek: false,
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailAdressenVerblijfsobject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verblijfsobject={verblijfsobject}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render `Nee` if indicatie geconstateerd is `false` and show a red bullet', () => {
    const verblijfsobject = {
      eigendomsverhouding: 'Verblijfsobject eigendomsverhouding',
      gebruiksdoelen: [
        {
          code: '01',
          description: 'Gebruiksdoel description 1',
        },
        {
          code: '0400',
          description: 'Gebruiksdoel description 2',
          descriptionPlus: 'Gebruiksdoel description plus',
        },
      ],
      label: 'Verblijfsobject label',
      type: 'Verblijfsobject type',
      status: {
        description: 'Status omschrijving',
        code: '23',
      },
      use: {
        code: '100',
        description: 'horeca',
      },
      isNevenadres: false,
      indicatieGeconstateerd: false,
      aanduidingInOnderzoek: true,
    }
    const clickHandler = jest.fn()
    const wrapper = shallow(
      <MapDetailAdressenVerblijfsobject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verblijfsobject={verblijfsobject}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
