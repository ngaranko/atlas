import React from 'react'
import { render, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { ThemeProvider } from '@datapunt/asc-ui'
import SpecialsPage from './SpecialsPage'
import useFromCMS from '../../utils/useFromCMS'
import setIframeSize from '../../utils/setIframeSize'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import getReduxLinkProps from '../../utils/getReduxLinkProps'
import useDocumentTitle from '../../utils/useDocumentTitle'

jest.mock('../../utils/useFromCMS')
jest.mock('../../utils/setIframeSize')
jest.mock('../../utils/getReduxLinkProps')
jest.mock('../../utils/useDocumentTitle')

describe('SpecialsPage', () => {
  const id = 6
  const href = 'https://this.is/a-link/this-is-a-slug'

  let store
  beforeEach(() => {
    getReduxLinkProps.mockImplementation(() => ({ href }))
    useDocumentTitle.mockImplementation(() => ({ setDocumentTitle: jest.fn() }))

    store = configureMockStore()({ location: { payload: { id } } })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  const fetchFromCMSMock = jest.fn()
  const mockData = {
    fetchFromCMS: fetchFromCMSMock,
    loading: false,
    results: {
      title: 'This is a title',
      field_iframe_link: {
        uri: 'http://this.is.alink',
      },
      field_slug: 'this-is-a-slug',
    },
  }

  it('should set the loading prop on the blog container', () => {
    useFromCMS.mockImplementation(() => ({
      loading: true,
    }))

    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const blogPage = component.find('BlogPage').at(0)
    expect(blogPage.props().loading).toBeTruthy()
  })

  it('should mount the iframe when there are results', () => {
    useFromCMS.mockImplementation(() => mockData)

    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const iframe = component.find('iframe').at(0)
    expect(iframe.exists()).toBeTruthy()
  })

  it('should call the fetchFromCMS function when the component mounts', () => {
    useFromCMS.mockImplementation(() => mockData)

console.log(store);


    const component = render(
      <ThemeProvider>
        <SpecialsPage store={store} />
      </ThemeProvider>
    )

    const iframe = component.find('iframe').at(0)
    expect(iframe.exists()).toBeTruthy()

    const endpoint = `${
      SHARED_CONFIG.CMS_ROOT
    }jsonapi/node/special?filter[drupal_internal__nid]=${id}`

    expect(component).toMatchSnapshot()

    expect(fetchFromCMSMock).toHaveBeenCalledWith(endpoint, ['field_iframe_link', 'field_slug'])
  })

  it('should call the setIframeSize function', () => {
    setIframeSize.mockImplementation(() => {})

    useFromCMS.mockImplementation(() => mockData)

    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const iframe = component.find('iframe').at(0)
    expect(iframe.exists()).toBeTruthy()

    iframe.simulate('load')

    expect(setIframeSize).toHaveBeenCalled()

    component.unmount()

    expect(setIframeSize).not.toHaveBeenCalledTimes(2)
  })
})
