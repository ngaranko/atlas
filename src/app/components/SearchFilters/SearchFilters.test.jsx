import * as React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SearchFilters from './SearchFilters'

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
  type: 'group',
  filterType: 'array',
  label: 'Groep',
  options: groupOptions,
}

const groupRadioFilters = {
  type: 'group',
  filterType: 'string',
  label: 'Group',
  options: groupOptions,
}

describe('SearchFilters', () => {
  beforeEach(cleanup)
  it('should render a list with checkbox inputs', () => {
    const { getByLabelText } = render(
      <SearchFilters
        type="group"
        activeFilters={[]}
        addActiveFilter={() => {}}
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
        activeFilters={[]}
        addActiveFilter={() => {}}
        availableFilters={groupRadioFilters}
      />,
    )

    const inputNode = getByLabelText('One (10)')
    expect(inputNode.getAttribute('type')).toBe('radio')
  })

  describe('adding and removing filters', () => {
    it('should add and remove a filter', () => {
      const addActiveFilterMock = jest.fn()
      const removeActiveFilterMock = jest.fn()
      const { getByLabelText } = render(
        <SearchFilters
          type="group"
          activeFilters={[]}
          removeActiveFilter={removeActiveFilterMock}
          addActiveFilter={addActiveFilterMock}
          availableFilters={groupCheckboxFilters}
        />,
      )

      const inputNodeOne = getByLabelText('One (10)')
      fireEvent.click(inputNodeOne)
      expect(addActiveFilterMock).toHaveBeenCalledWith('group', 'one', false)

      fireEvent.click(inputNodeOne)
      expect(removeActiveFilterMock).toHaveBeenCalledWith('group', 'one')
    })
  })
})
