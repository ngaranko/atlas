import React from 'react'
import { shallow /* mount */ } from 'enzyme'
import EditorialOverviewPage from './EditorialOverviewPage'
import useFromCMS from '../../utils/useFromCMS'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'

import Footer from '../../components/Footer/Footer'

jest.mock('../../utils/useFromCMS')
jest.mock('../../components/Footer/Footer')
jest.mock('../../../shared/services/link-attributes-from-action/linkAttributesFromAction')

describe('EditorialOverviewPage', () => {
  // const fetchDataMock = jest.fn()

  beforeEach(() => {
    Footer.mockImplementation(() => <></>)
    linkAttributesFromAction.mockImplementation(() => ({ href: 'http://this.is.a/link' }))
  })

  it('should render the spinner when the request is loading', () => {
    useFromCMS.mockImplementation(() => ({
      loading: true,
    }))

    const component = shallow(<EditorialOverviewPage type="ARTICLES" />)

    expect(component.find('LoadingIndicator').exists()).toBeTruthy()
  })
})
