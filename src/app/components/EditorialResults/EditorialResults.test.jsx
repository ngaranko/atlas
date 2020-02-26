import React from 'react'
import { shallow } from 'enzyme'
import EditorialResults from './EditorialResults'
import { TYPES } from '../../../shared/config/cms.config'

describe('EditorialResults', () => {
  let component

  it('should display the loading indicator', () => {
    component = shallow(<EditorialResults type={TYPES.ARTICLE} loading results={[]} errors={[]} />)
    expect(component.find('LoadingIndicator').exists()).toBe(true)

    component = shallow(
      <EditorialResults type={TYPES.ARTICLE} loading={false} results={[]} errors={[]} />,
    )
    expect(component.find('LoadingIndicator').exists()).toBe(false)
  })

  it('should render the cards', () => {
    component = shallow(<EditorialResults type={TYPES.ARTICLE} results={[]} errors={[]} />)
    expect(component.find('EditorialCard').exists()).toBe(false)

    // Should render two cards
    component = shallow(<EditorialResults type={TYPES.ARTICLE} results={[{}, {}]} errors={[]} />)
    expect(component.find('EditorialCard').exists()).toBe(true)
    expect(component.find('EditorialCard')).toHaveLength(2)
  })
})
