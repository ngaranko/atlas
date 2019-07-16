import React from 'react'
import { shallow } from 'enzyme'
import ArticlePage from './ArticlePage'

describe('ArticlePage', () => {
  it('should render', () => {
    const component = shallow(<ArticlePage id={4} />)
    expect(component).toMatchSnapshot()
  })
})
