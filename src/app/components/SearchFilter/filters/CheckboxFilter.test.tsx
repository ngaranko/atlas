import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import CheckboxFilter from './CheckboxFilter'
import { FilterProps } from '../models'
import { FilterOption } from '../../../models'

describe('CheckboxFilter', () => {
  beforeEach(cleanup)

  const defaultProps = {
    type: 'test',
    options: [],
    totalCount: 999,
    hideCount: true,
    selection: [],
  }

  const options: FilterOption[] = [
    { id: 'first', label: 'First', count: 0 },
    { id: 'second', label: 'Second', count: 0 },
    { id: 'last', label: 'Last', count: 0 },
  ]

  it('should render a list of options without selection', () => {
    const props: FilterProps = { ...defaultProps, options, onSelectionChange: () => {} }
    const { getByLabelText } = render(<CheckboxFilter {...props} />)

    const firstNode = getByLabelText('First') as HTMLInputElement
    const secondNode = getByLabelText('Second') as HTMLInputElement
    const lastNode = getByLabelText('Last') as HTMLInputElement
    ;[firstNode, secondNode, lastNode].forEach((node, index) => {
      const option = options[index]

      expect(node.tagName).toEqual('INPUT')
      expect(node.type).toEqual('checkbox')
      expect(node.getAttribute('value')).toEqual(option.id)
      expect(node.checked).toEqual(false)
    })
  })

  it('should render a list of options with selection', () => {
    const selection = ['second']
    const props: FilterProps = { ...defaultProps, options, selection, onSelectionChange: () => {} }
    const { getByLabelText } = render(<CheckboxFilter {...props} />)
    const secondNode = getByLabelText('Second') as HTMLInputElement

    expect(secondNode.checked).toEqual(true)
  })

  it('should handle changes in selection', () => {
    const selection = ['first']
    const selectionChangeMock = jest.fn()
    const props: FilterProps = {
      ...defaultProps,
      options,
      selection,
      onSelectionChange: selectionChangeMock,
    }
    const { getByLabelText } = render(<CheckboxFilter {...props} />)

    fireEvent.click(getByLabelText('Last'))

    expect(selectionChangeMock).toHaveBeenCalledWith(['first', 'last'])
  })

  it('should handle changes in selection to the default', () => {
    const selection = ['first']
    const selectionChangeMock = jest.fn()
    const props: FilterProps = {
      ...defaultProps,
      options,
      selection,
      onSelectionChange: selectionChangeMock,
    }
    const { getByLabelText } = render(<CheckboxFilter {...props} />)

    fireEvent.click(getByLabelText('First'))

    expect(selectionChangeMock).toHaveBeenCalledWith([])
  })
})
