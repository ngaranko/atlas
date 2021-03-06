import React from 'react'
import { shallow } from 'enzyme'
import ActiveFilters from './ActiveFilters'

// Todo: add more tests
describe('ActiveFilters', () => {
  it('should render', () => {
    const component = shallow(
      <ActiveFilters
        filters={[{ label: 'Stadsdeel', slug: 'stadsdeel_naam', options: 'Centrum' }]}
        removeFilter={() => {}}
      />,
    )
    expect(component).toMatchSnapshot()
  })

  it('should handle remove filter', () => {
    const removeFilter = jest.fn()
    const component = shallow(
      <ActiveFilters
        filters={[{ label: 'Stadsdeel', slug: 'stadsdeel_naam', options: 'Centrum' }]}
        removeFilter={removeFilter}
      />,
    )
    component.find('button').simulate('click')
    expect(removeFilter.mock.calls.length).toBe(1)
    expect(removeFilter.mock.calls[0][0]).toBe('stadsdeel_naam')
  })
})
