import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from '@datapunt/asc-ui'
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
    const component = mount(
      <ThemeProvider>
        <Search props={props} />
      </ThemeProvider>,
    )
    expect(component.find('Styled(SearchBar)').exists()).toBe(true)
    expect(component.find('SearchBarToggle').exists()).toBe(true)

    const backDrop = component.find("[data-test='backDrop']")

    expect(backDrop.exists()).toBe(true)
    expect(backDrop).toHaveStyleRule('display', 'none')
  })

  it('should set the backdrop when the parent component send the correct props', () => {
    const component = mount(
      <ThemeProvider>
        <Search {...{ ...props, expanded: true }} />
      </ThemeProvider>,
    )

    const backDrop = component.find("[data-test='backDrop']")

    expect(backDrop.exists()).toBe(true)
    expect(backDrop).toHaveStyleRule('display', 'initial')
  })
})
