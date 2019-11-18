import React from 'react'
import { shallow } from 'enzyme'
import EditorialResults from './EditorialResults'

jest.mock('../../utils/usePagination')

describe('EditorialResults', () => {
  let component

  it('should display the loading indicator', () => {
    component = shallow(<EditorialResults loading />)
    expect(component.find('LoadingIndicator').exists()).toBe(true)

    component = shallow(<EditorialResults loading={false} />)
    expect(component.find('LoadingIndicator').exists()).toBe(false)
  })

  it('should display the title', () => {
    component = shallow(<EditorialResults showTitle={false} title="Foo" />)
    expect(component.find('Styled(Heading)').exists()).toBe(false)

    component = shallow(<EditorialResults showTitle title="Foo" />)
    expect(component.find('Styled(Heading)').exists()).toBe(true)
  })

  it('should call the onClickMore function', () => {
    const onClickMore = jest.fn()

    component = shallow(<EditorialResults />)
    expect(component.find('Styled(Button)').exists()).toBe(false)

    // There should be a button here to load more content
    component = shallow(<EditorialResults onClickMore={onClickMore} />)

    const button = component.find('Styled(Button)')
    expect(button.exists()).toBe(true)

    button.simulate('click')

    expect(onClickMore).toHaveBeenCalled()
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
