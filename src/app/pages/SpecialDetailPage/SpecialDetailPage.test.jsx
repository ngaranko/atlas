import React from 'react'
import { render, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { ThemeProvider } from '@datapunt/asc-ui'
import SpecialDetailPage from './SpecialDetailPage'
import useFromCMS from '../../utils/useFromCMS'
import setIframeSize from '../../../shared/services/set-iframe-size/setIframeSize'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'
import useDocumentTitle from '../../utils/useDocumentTitle'
import Footer from '../../components/Footer/Footer';

jest.mock('../../utils/useFromCMS')
jest.mock('../../../shared/services/set-iframe-size/setIframeSize')
jest.mock('../../../shared/services/link-attributes-from-action/linkAttributesFromAction')
jest.mock('../../utils/useDocumentTitle')
jest.mock('../../utils/useDocumentTitle')
jest.mock('../../components/Footer/Footer')

describe('SpecialDetailPage', () => {
  const id = 6
  const href = 'https://this.is/a-link/this-is-a-slug'
  const fetchDataMock = jest.fn()

  let store
  let mockData

  beforeEach(() => {
    linkAttributesFromAction.mockImplementation(() => ({ href }))
    useDocumentTitle.mockImplementation(() => ({ setDocumentTitle: jest.fn() }))
    Footer.mockImplementation(() => <></>)

    store = configureMockStore()({ location: { payload: { id } } })
    mockData = {
      fetchData: fetchDataMock,
      loading: false,
      results: {
        title: 'This is a title',
        field_iframe_link: {
          uri: 'http://this.is.alink',
        },
        field_slug: 'this-is-a-slug',
      },
    }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })


  it('should set the loading prop on the blog container', () => {
    useFromCMS.mockImplementation(() => ({
      loading: true,
    }))

    const component = shallow(<SpecialDetailPage />, { context: { store } }).dive()

    const blogPage = component.find('BlogPage').at(0)
    expect(blogPage.props().loading).toBeTruthy()
  })

  it('should mount the iframe when there are results', () => {
    useFromCMS.mockImplementation(() => mockData)

    const component = shallow(<SpecialDetailPage />, { context: { store } }).dive()

    const iframe = component.find('iframe').at(0)
    expect(iframe.exists()).toBeTruthy()
  })

  it('should call the fetchData function when the component mounts', () => {
    useFromCMS.mockImplementation(() => mockData)

    const component = render(
      <ThemeProvider>
        <SpecialDetailPage store={store} />
      </ThemeProvider>,
    )

    expect(component.find('iframe')).toBeTruthy()

    expect(component).toMatchSnapshot()

    expect(component.find('SpecialDetailPage')).toBeTruthy()
  })

  it('should call the setIframeSize function', () => {
    setIframeSize.mockImplementation(() => {})

    useFromCMS.mockImplementation(() => mockData)

    const component = shallow(<SpecialDetailPage />, { context: { store } }).dive()

    const iframe = component.find('iframe').at(0)
    expect(iframe.exists()).toBeTruthy()

    iframe.simulate('load')

    expect(setIframeSize).toHaveBeenCalled()

    component.unmount()

    expect(setIframeSize).not.toHaveBeenCalledTimes(2)
  })
})
