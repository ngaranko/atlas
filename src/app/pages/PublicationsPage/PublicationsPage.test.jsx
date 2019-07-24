import React from 'react'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { ThemeProvider } from '@datapunt/asc-ui'
import PublicationsPage from './PublicationsPage'
import useFromCMS from '../../utils/useFromCMS'
import getReduxLinkProps from '../../utils/getReduxLinkProps'
import cmsConfig from '../../../shared/services/cms/cms-config'
import Footer from '../../components/Footer/Footer'
import useDocumentTitle from '../../utils/useDocumentTitle'
import useMatomo from '../../utils/useMatomo'

jest.mock('../../utils/useFromCMS')
jest.mock('../../utils/getReduxLinkProps')
jest.mock('downloadjs')
jest.mock('../../components/Footer/Footer')
jest.mock('../../utils/useDocumentTitle')
jest.mock('../../utils/useMatomo')

describe('PublicationsPage', () => {
  const id = 3
  const href = 'https://this.is/a-link/this-is-a-slug'

  const mockData = {
    fetchData: jest.fn(),
    results: {
      drupal_internal__nid: 100,
      title: 'This is a title',
      created: '2015-05-05',
      body: {
        value: 'body text',
      },
      field_file_size: 'file size',
      field_file_type: 'pdf',
      field_publication_source: 'source',
      field_publication_intro: 'intro',
      field_slug: 'slug',
      included: [
        { attributes: { uri: { url: 'https://cover-link' } } },
        { attributes: { uri: { url: 'https://cover-link' } } },
        { attributes: { uri: { url: 'https://document-link' } } },
        { attributes: { uri: { url: 'https://document-link' } } },
      ],
    },
  }

  let store
  beforeEach(() => {
    getReduxLinkProps.mockImplementation(() => ({ href }))
    Footer.mockImplementation(() => <></>)
    useDocumentTitle.mockImplementation(() => ({ href }))
    useMatomo.mockImplementation(() => ({ href }))

    store = configureMockStore()({ location: { payload: { id } } })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render the spinner when the request is loading', () => {
    useFromCMS.mockImplementation(() => ({
      loading: true,
    }))

    const component = shallow(<PublicationsPage />, {
      context: { store },
    }).dive()

    const blogPage = component.find('BlogPage').at(0)
    expect(blogPage.props().loading).toBeTruthy()
  })

  it('should call the fetchData function when the component mounts', () => {
    const fetchDataMock = jest.fn()
    useFromCMS.mockImplementation(() => ({
      fetchData: fetchDataMock,
      loading: true,
    }))

    store = configureMockStore()({ location: { payload: { id } } })

    const component = mount(
      <ThemeProvider>
        <PublicationsPage store={store} />
      </ThemeProvider>,
      { context: { store } },
    )

    expect(component.find('PublicationsPage').props().id).toBe(id)

    expect(fetchDataMock).toHaveBeenCalledWith(id, cmsConfig.publication)
  })

  it('should render the publication when there are results', () => {
    useFromCMS.mockImplementation(() => mockData)
    const component = shallow(<PublicationsPage />, {
      context: { store },
    }).dive()

    expect(component).toMatchSnapshot()
  })
})
