import React from 'react'
import { mount, shallow } from 'enzyme'
import BlogPage from './BlogPage'
import useMatomo from '../../utils/useMatomo'
import getReduxLinkProps from '../../utils/getReduxLinkProps'
import useDocumentTitle from '../../utils/useDocumentTitle'
import Footer from '../Footer/Footer';

jest.mock('../../utils/getReduxLinkProps')
jest.mock('../../utils/useDocumentTitle')
jest.mock('../../utils/useMatomo')
jest.mock('../Footer/Footer')

describe('BlogPage', () => {
  let component
  const mockSetDocumentTitle = jest.fn()
  const mockTrackPageView = jest.fn()

  beforeEach(() => {
    getReduxLinkProps.mockImplementation(() => ({ href: 'https://this.is.alink' }))
    useDocumentTitle.mockImplementation(() => ({ setDocumentTitle: mockSetDocumentTitle }))
    useMatomo.mockImplementation(() => ({ trackPageView: mockTrackPageView }))
    Footer.mockImplementation(() => <></>)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should display the loading indicator', () => {
    component = shallow(<BlogPage loading />).dive()

    expect(component.find('LoadingIndicator')).toBeTruthy()
  })

  it('should set the canonical title', () => {
    component = shallow(<BlogPage id={6} slug="foo" />).dive()

    const link = component.find('link')
    expect(link).toBeTruthy()
    expect(link.props().href).toBe('https://this.is.alink')
  })

  it('should set the document title and send to analytics', () => {
    component = mount(<BlogPage documentTitle="foo" />)

    expect(mockSetDocumentTitle).toHaveBeenCalledWith('foo')
    expect(mockTrackPageView).toHaveBeenCalledWith('foo')
  })
})
