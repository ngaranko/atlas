import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import ArticlePage from './ArticlePage'

describe('ArticlePage', () => {
  it('should render', () => {
    const store = configureMockStore()({ location: { payload: { id: 6 } } })
    
    const component = shallow(<ArticlePage id={4} />,  { context: { store } },)
    expect(component).toMatchSnapshot()
  })
})
