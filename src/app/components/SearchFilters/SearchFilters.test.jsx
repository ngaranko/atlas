import * as React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SearchFilters, { TYPES } from './SearchFilters'

const options = [
  {
    label: 'One',
    id: 'one',
    count: 10,
  },
  {
    label: 'Two',
    id: 'two',
    count: 5,
  },
]

const availableCheckboxFilters = {
  ui: TYPES.check,
  title: 'Groep',
  options,
}

const availableRadioFilters = {
  ui: TYPES.radio,
  title: 'Groep',
  options,
}

describe('SearchFilters', () => {
  beforeEach(cleanup)
  it('should render a list with checkbox inputs', () => {
    const { getByLabelText } = render(
      <SearchFilters
        type="groep"
        activeFilters={[]}
        setActiveFilters={() => {}}
        availableFilters={availableCheckboxFilters}
      />,
    )

    const inputNode = getByLabelText('One (10)')
    expect(inputNode.getAttribute('type')).toBe('checkbox')
  })

  it('should render a list with radio inputs', () => {
    const { getByLabelText } = render(
      <SearchFilters
        type="groep"
        activeFilters={[]}
        setActiveFilters={() => {}}
        availableFilters={availableRadioFilters}
      />,
    )

    const inputNode = getByLabelText('One (10)')
    expect(inputNode.getAttribute('type')).toBe('radio')
  })

  describe('adding and removing filters', () => {
    it('should add a filter to activeFilters', () => {
      const setActiveFiltersMock = jest.fn()
      const { getByLabelText, rerender } = render(
        <SearchFilters
          type="groep"
          activeFilters={[]}
          setActiveFilters={setActiveFiltersMock}
          availableFilters={availableCheckboxFilters}
        />,
      )

      const inputNodeOne = getByLabelText('One (10)')
      const inputNodeTwo = getByLabelText('Two (5)')
      fireEvent.click(inputNodeOne)
      expect(setActiveFiltersMock).toHaveBeenCalledWith({
        groep: ['one'],
      })
      rerender(
        <SearchFilters
          type="groep"
          activeFilters={{ groep: ['one'] }}
          setActiveFilters={setActiveFiltersMock}
          availableFilters={availableCheckboxFilters}
        />,
      )
      fireEvent.click(inputNodeTwo)
      expect(setActiveFiltersMock).toHaveBeenCalledWith({
        groep: ['one', 'two'],
      })
    })
    it('should add only one filter to activeFilters when type is radio', () => {
      const { getByLabelText } = render(
        <SearchFilters
          activeFilters={[]}
          setActiveFilters={() => {}}
          availableFilters={availableRadioFilters}
        />,
      )

      const inputNode = getByLabelText('One (10)')
      expect(inputNode.getAttribute('type')).toBe('radio')
    })

    it('should add a filter to an existing activeFilter', () => {})
  })
})
