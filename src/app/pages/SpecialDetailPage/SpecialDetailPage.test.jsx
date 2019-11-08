import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import SpecialDetailPage from './SpecialDetailPage'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'
import useDocumentTitle from '../../utils/useDocumentTitle'

jest.mock('../../utils/useFromCMS')
jest.mock('../../../shared/services/set-iframe-size/setIframeSize')
jest.mock('../../../shared/services/link-attributes-from-action/linkAttributesFromAction')
jest.mock('../../utils/useDocumentTitle')

describe('SpecialDetailPage', () => {
  const id = 6
  const href = 'https://this.is/a-link/this-is-a-slug'

  let store

  beforeEach(() => {
    linkAttributesFromAction.mockImplementation(() => ({ href }))
    useDocumentTitle.mockImplementation(() => ({ setDocumentTitle: jest.fn() }))

    store = configureMockStore()({ location: { payload: { id } } })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should set the loading prop on the blog container', () => {
    useFromCMS.mockImplementation(() => ({
      loading: true,
    }))

    const component = shallow(<SpecialDetailPage store={store} />)
      .dive()
      .dive()

    const editorialPage = component.find('EditorialPage').at(0)
    expect(editorialPage.props().loading).toBeTruthy()
  })
})
