import React from 'react'
import { shallow } from 'enzyme'
import EditorialResults from './EditorialResults'

describe('EditorialResults', () => {
  let component

  it('should display the loading indicator', () => {
    component = shallow(<EditorialResults loading />)
    expect(component.find('LoadingIndicator').exists()).toBe(true)

    component = shallow(<EditorialResults loading={false} />)
    expect(component.find('LoadingIndicator').exists()).toBe(false)
  })

  it('should render the cards', () => {
    component = shallow(<EditorialResults results={[]} />)
    expect(component.find('EditorialCard').exists()).toBe(false)

    // Should render two cards
    component = shallow(<EditorialResults results={[{}, {}]} />)
    expect(component.find('EditorialCard').exists()).toBe(true)
    expect(component.find('EditorialCard')).toHaveLength(2)
  })
})
