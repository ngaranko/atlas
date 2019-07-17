import React from 'react'
import { mount, shallow, render } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { ThemeProvider } from '@datapunt/asc-ui'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import PublicationsPage from './PublicationsPage'
import useDataFetching from '../../utils/useDataFetching'

jest.mock('../../utils/useDataFetching')

describe('PublicationsPage', () => {
  const id = 3

  const mockData = {
    fetchData: jest.fn(),
    results: {
      data: [
        {
          attributes: {
            title: 'This is a title',
            created: '2015-05-05',
            body: {
              processed: 'body text',
            },
            field_file_size: 'file size',
            field_file_type: 'pdf',
            field_publication_source: 'source',
            field_publication_intro: 'intro',
          },
        },
      ],
      included: [
        { attributes: { uri: { url: 'https://cover-link' } } },
        { attributes: { uri: { url: 'https://document-link' } } },
      ],
    },
  }

  let store
  beforeEach(() => {
    store = configureMockStore()({ location: { payload: { id } } })
  })

  it('should render the spinner when the request is loading', () => {
    useDataFetching.mockImplementation(() => ({
      loading: true,
    }))

    const component = shallow(<PublicationsPage />, {
      context: { store },
    }).dive()

    const spinner = component.find('Spinner').at(0)
    expect(spinner.exists()).toBeTruthy()
  })

  it('should call the fetchData function when the component mounts', () => {
    const fetchDataMock = jest.fn()
    useDataFetching.mockImplementation(() => ({
      fetchData: fetchDataMock,
      loading: true,
    }))

    const component = mount(
      <ThemeProvider>
        <PublicationsPage store={store} />
      </ThemeProvider>,
      { context: { store } },
    )

    const endpoint = `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/publication?filter[drupal_internal__nid]=${id}&include=field_cover_image,field_publication_file`

    expect(component.find('PublicationsPage').props().endpoint).toBe(endpoint)

    expect(fetchDataMock).toHaveBeenCalledWith(endpoint)
  })

  it('should render the publication when there are results', () => {
    useDataFetching.mockImplementation(() => mockData)
    // console.log(store)
    const component = render(
      <ThemeProvider>
        <PublicationsPage store={store} />
      </ThemeProvider>,
      { context: { store } },
    )
    expect(component).toMatchSnapshot()
  })
})
