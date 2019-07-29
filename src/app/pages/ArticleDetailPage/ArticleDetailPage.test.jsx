import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import ArticleDetailPage from './ArticleDetailPage'

describe('ArticleDetailPage', () => {
  it('should render', () => {
    const store = configureMockStore()({ location: { payload: { id: 6 } } })
    
    const component = shallow(<ArticleDetailPage id={4} />,  { context: { store } },)
    expect(component).toMatchSnapshot()
  })
})
