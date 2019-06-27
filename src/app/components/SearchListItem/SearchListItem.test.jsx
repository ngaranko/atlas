import React from 'react'
import { shallow } from 'enzyme'
import SearchListItem from './SearchListItem'

describe('SearchListItem', () => {
  it('should render straatnamen type weg', () => {
    const props = {
      result: {
        label: 'label',
        subtype: 'weg',
        subtypeLabel: 'weg',
        linkTo: {},
      },
      category: {
        slug: 'straatnamen',
      },
    }

    const component = shallow(<SearchListItem {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('should render openbareruimte type water', () => {
    const props = {
      result: {
        label: 'label',
        subtype: 'water',
        subtypeLabel: 'water',
        linkTo: {},
      },
      category: {
        slug: 'openbareruimte',
      },
    }

    const component = shallow(<SearchListItem {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('should render address type verblijfsobject', () => {
    const props = {
      result: {
        label: 'label',
        subtype: 'verblijfsobject',
        subtypeLabel: 'verblijfsobject',
        linkTo: {},
        hoofdadres: false,
        vbo_status: {
          code: '18',
          omschrijving: 'Verblijfsobject gevormd',
        },
      },
      category: {
        slug: 'adres',
      },
    }

    const component = shallow(<SearchListItem {...props} />)
    expect(component).toMatchSnapshot()
  })

  it('should render monument type complex', () => {
    const props = {
      result: {
        label: 'label',
        subtype: 'complex',
        subtypeLabel: 'complex',
        linkTo: {},
      },
      category: {
        slug: 'monument',
      },
    }

    const component = shallow(<SearchListItem {...props} />)
    expect(component).toMatchSnapshot()
  })
})
