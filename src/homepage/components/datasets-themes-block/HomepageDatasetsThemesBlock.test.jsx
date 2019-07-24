import React from 'react'
import { shallow } from 'enzyme'

import HomepageDatasetsThemesBlock from './HomepageDatasetsThemesBlock'

describe('HomepageDatasetsThemesBlock.test', () => {
  it('should render', () => {
    const wrapper = shallow(<HomepageDatasetsThemesBlock />)

    expect(wrapper).toMatchSnapshot()
  })
})
