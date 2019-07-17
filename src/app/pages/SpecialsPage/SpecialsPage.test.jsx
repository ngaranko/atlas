import React from 'react'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { ThemeProvider } from '@datapunt/asc-ui'
import SpecialsPage from './SpecialsPage'
import useDataFetching from '../../utils/useDataFetching'
import setIframeSize from '../../utils/setIframeSize'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import getReduxLinkProps from '../../utils/getReduxLinkProps'

jest.mock('../../utils/useDataFetching')
jest.mock('../../utils/setIframeSize')
jest.mock('../../utils/getReduxLinkProps')

describe('SpecialsPage', () => {
  const specialsId = 6
  const specialsHref = 'https://this.is/a-link/this-is-a-slug'

  getReduxLinkProps.mockImplementation(() => ({
    href: specialsHref,
  }))

  const mockData = {
    fetchData: jest.fn(),
    results: {
      data: [
        {
          attributes: {
            title: 'This is a title',
            field_iframe_link: {
              uri: 'http://this.is.alink',
            },
            slug: 'this-is-a-slug',
          },
        },
      ],
    },
  }

  it('should render the spinner when the request is loading', () => {
    useDataFetching.mockImplementation(() => ({
      loading: true,
    }))

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const spinner = component.find('Spinner').at(0)
    expect(spinner.exists()).toBeTruthy()
  })

  it('should render the iframe when there are results', () => {
    useDataFetching.mockImplementation(() => mockData)

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const iframe = component.find('iframe').at(0)
    expect(iframe.exists()).toBeTruthy()
  })

  it('should set the values for Helmet', () => {
    useDataFetching.mockImplementation(() => mockData)

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    expect(getReduxLinkProps).toHaveBeenCalled()

    const helmet = component.find('HelmetWrapper')
    expect(helmet.exists()).toBeTruthy()
    expect(helmet.find('link').props().href).toBe(specialsHref)
  })

  it('should call the fetchData function when the component mounts', () => {
    const fetchDataMock = jest.fn()
    useDataFetching.mockImplementation(() => ({
      fetchData: fetchDataMock,
      loading: true,
    }))

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = mount(
      <ThemeProvider>
        <SpecialsPage store={store} />
      </ThemeProvider>,
    )

    const endpoint = `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/special?filter[drupal_internal__nid]=${specialsId}`

    expect(component.find('SpecialsPage').props().endpoint).toBe(endpoint)

    expect(fetchDataMock).toHaveBeenCalledWith(endpoint)
  })

  it('should call the setIframeSize function', () => {
    setIframeSize.mockImplementation(() => {})

    useDataFetching.mockImplementation(() => mockData)

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = mount(
      <ThemeProvider>
        <SpecialsPage store={store} />
      </ThemeProvider>,
    )

    const iframe = component.find('iframe').at(0)

    iframe.simulate('load')

    expect(setIframeSize).toHaveBeenCalled()

    component.unmount()

    expect(setIframeSize).not.toHaveBeenCalledTimes(2)
  })
})
