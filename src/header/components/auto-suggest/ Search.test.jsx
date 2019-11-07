import React from 'react'
import { shallow } from 'enzyme'
import Search from './Search'

describe('Search', () => {
  const onOpenSearchBarToggleMock = jest.fn()
  const props = {
    expanded: false,
    searchBarProps: {},
    openSearchBarToggle: false,
    onOpenSearchBarToggle: onOpenSearchBarToggleMock,
    inputProps: {},
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should shallow the searchbar and searchtoggle', () => {
    const component = shallow(<Search {...props} />)

    expect(component.find('Styled(SearchBar)').exists()).toBe(true)
    expect(component.find('SearchBarToggle').exists()).toBe(true)
    expect(component.find('Styled(BackDrop)').exists()).toBe(false)
  })

  it('should set the backdrop when the parent component send the correct props', () => {
    const component = shallow(<Search {...{ ...props, expanded: true }} />)

    const backDrop = component.find('Styled(BackDrop)')
    expect(backDrop.exists()).toBe(true)
  })
})
