import React from 'react'
import { shallow } from 'enzyme'
import Search from './Search'

describe('Search', () => {
  let component
  const setBackDropMock = jest.fn()
  const onOpenSearchBarToggleMock = jest.fn()
  const props = {
    showSuggestions: false,
    suggestions: [],
    searchBarProps: {},
    openSearchBarToggle: false,
    onOpenSearchBarToggle: onOpenSearchBarToggleMock,
    inputProps: {},
  }

  beforeEach(() => {
    component = shallow(<Search {...props} />)
  })

  it('should shallow the searchbar and searchtoggle', () => {
    expect(component.find('SearchBar').exists()).toBe(true)
    expect(component.find('SearchBarToggle').exists()).toBe(true)
  })

  it('should set the backdrop when the user clicks the toggle', () => {
    component
      .find('SearchBarToggle')
      .props()
      .onOpen(true)

    expect(onOpenSearchBarToggleMock).toHaveBeenCalledWith(true)

    expect(setBackDropMock).toHaveBeenCalledWith({ payload: { open: true, key: 'search' } })
  })
})
