import * as React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SearchFilters, { TYPES } from './SearchFilters'

const groupOptions = [
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

const groupCheckboxFilters = {
  ui: TYPES.check,
  title: 'Groep',
  options: groupOptions,
}

const groupRadioFilters = {
  ui: TYPES.radio,
  title: 'Group',
  options: groupOptions,
}

describe('SearchFilters', () => {
  beforeEach(cleanup)
  it('should render a list with checkbox inputs', () => {
    const { getByLabelText } = render(
      <SearchFilters
        type="group"
        activeFilters={undefined}
        setActiveFilters={() => {}}
        availableFilters={groupCheckboxFilters}
      />,
    )

    const inputNode = getByLabelText('One (10)')
    expect(inputNode.getAttribute('type')).toBe('checkbox')
  })

  it('should render a list with radio inputs', () => {
    const { getByLabelText } = render(
      <SearchFilters
        type="group"
        activeFilters={undefined}
        setActiveFilters={() => {}}
        availableFilters={groupRadioFilters}
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
          type="group"
          activeFilters={undefined}
          setActiveFilters={setActiveFiltersMock}
          availableFilters={groupCheckboxFilters}
        />,
      )

      const inputNodeOne = getByLabelText('One (10)')
      const inputNodeTwo = getByLabelText('Two (5)')
      fireEvent.click(inputNodeOne)
      expect(setActiveFiltersMock).toHaveBeenCalledWith({
        type: 'group',
        filters: ['one'],
      })
      rerender(
        <SearchFilters
          type="group"
          activeFilters={['one']}
          setActiveFilters={setActiveFiltersMock}
          availableFilters={groupCheckboxFilters}
        />,
      )
      fireEvent.click(inputNodeTwo)
      expect(setActiveFiltersMock).toHaveBeenCalledWith({
        type: 'group',
        filters: ['one', 'two'],
      })
    })
    it('should add only one filter to activeFilters when type is radio', () => {
      const setActiveFiltersMock = jest.fn()
      const { getByLabelText } = render(
        <SearchFilters
          type="group"
          activeFilters={undefined}
          setActiveFilters={setActiveFiltersMock}
          availableFilters={groupRadioFilters}
        />,
      )

      const inputNode = getByLabelText('One (10)')
      expect(inputNode.getAttribute('type')).toBe('radio')

      fireEvent.click(inputNode)

      expect(setActiveFiltersMock).toHaveBeenCalledWith({
        type: 'group',
        filters: ['one'],
      })
    })
  })
})
