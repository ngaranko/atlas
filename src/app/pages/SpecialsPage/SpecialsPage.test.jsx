import React from 'react'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { ThemeProvider } from '@datapunt/asc-ui'
import SpecialsPage from './SpecialsPage'
import useFromCMS from '../../utils/useFromCMS'
import setIframeSize from '../../utils/setIframeSize'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import getReduxLinkProps from '../../utils/getReduxLinkProps'

jest.mock('../../utils/useFromCMS')
jest.mock('../../utils/setIframeSize')
jest.mock('../../utils/getReduxLinkProps')

describe('SpecialsPage', () => {
  const specialsId = 6
  const specialsHref = 'https://this.is/a-link/this-is-a-slug'

  getReduxLinkProps.mockImplementation(() => ({
    href: specialsHref,
  }))

  const mockData = {
    fetchFromCMS: jest.fn(),
    results: {
      title: 'This is a title',
      field_iframe_link: {
        uri: 'http://this.is.alink',
      },
      field_slug: 'this-is-a-slug',
    }
  }

  it('should render the spinner when the request is loading', () => {
    useFromCMS.mockImplementation(() => ({
      loading: true,
    }))

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const spinner = component.find('Spinner').at(0)
    expect(spinner.exists()).toBeTruthy()
  })

  it('should render the iframe when there are results', () => {
    useFromCMS.mockImplementation(() => mockData)

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const iframe = component.find('iframe').at(0)
    expect(iframe.exists()).toBeTruthy()
  })

  it('should set the values for Helmet', () => {
    useFromCMS.mockImplementation(() => mockData)

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    expect(getReduxLinkProps).toHaveBeenCalled()

    const helmet = component.find('HelmetWrapper')
    expect(helmet.exists()).toBeTruthy()
    expect(helmet.find('link').props().href).toBe(specialsHref)
  })

  it('should call the fetchFromCMS function when the component mounts', () => {
    const fetchFromCMSMock = jest.fn()
    useFromCMS.mockImplementation(() => ({
      fetchFromCMS: fetchFromCMSMock,
      loading: true,
    }))

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = mount(
      <ThemeProvider>
        <SpecialsPage store={store} />
      </ThemeProvider>,
    )

    const endpoint = `${
      SHARED_CONFIG.CMS_ROOT
    }jsonapi/node/special?filter[drupal_internal__nid]=${specialsId}`

    expect(component.find('SpecialsPage').props().endpoint).toBe(endpoint)

    expect(fetchFromCMSMock).toHaveBeenCalledWith(endpoint, ["field_iframe_link", "field_slug"])
  })

  it('should call the setIframeSize function', () => {
    setIframeSize.mockImplementation(() => {})

    useFromCMS.mockImplementation(() => mockData)

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
