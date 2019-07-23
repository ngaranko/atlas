import React from 'react'
import { shallow } from 'enzyme'
import Thumbnail from './Thumbnail'

describe('Thumbnail', () => {
  it('should render the component', () => {
    const src = 'source'
    const title = 'foo'

    const component = shallow(<Thumbnail src={src} title={title} />)

    const img = component.find('img').at(0)

    expect(img.props().alt).toBe(title)
    expect(img.props().src).toBe(src)

    const span = component.find('span').at(0)

    expect(span.props().children).toBe(title)
  })
})
