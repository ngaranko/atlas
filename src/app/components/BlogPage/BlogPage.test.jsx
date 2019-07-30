import React from 'react'
import { mount, shallow } from 'enzyme'
import BlogPage from './BlogPage'
import useMatomo from '../../utils/useMatomo'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'
import useDocumentTitle from '../../utils/useDocumentTitle'
import Footer from '../Footer/Footer'

jest.mock('../../../shared/services/link-attributes-from-action/linkAttributesFromAction')
jest.mock('../../utils/useDocumentTitle')
jest.mock('../../utils/useMatomo')
jest.mock('../Footer/Footer')

describe('BlogPage', () => {
  let component
  const mockSetDocumentTitle = jest.fn()
  const mockTrackPageView = jest.fn()

  beforeEach(() => {
    linkAttributesFromAction.mockImplementation(() => ({
      href: 'https://this.is.alink',
    }))
    useDocumentTitle.mockImplementation(() => ({
      setDocumentTitle: mockSetDocumentTitle,
    }))
    useMatomo.mockImplementation(() => ({ trackPageView: mockTrackPageView }))
    Footer.mockImplementation(() => <></>)

    component = shallow(<BlogPage id="6" slug="foo" linkAction={() => {}} />).dive()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should display the loading indicator', () => {
    component.setProps({ loading: true })

    expect(component.find('LoadingIndicator')).toBeTruthy()
  })

  it('should set the canonical title', () => {
    const link = component.find('link')
    expect(link).toBeTruthy()
    expect(link.props().href).toBe('https://this.is.alink')
  })

  it('should set the document title and send to analytics', () => {
    component = mount(<BlogPage id={6} slug="foo" linkAction={() => {}} documentTitle="" />)

    expect(mockSetDocumentTitle).not.toHaveBeenCalled()
    expect(mockTrackPageView).not.toHaveBeenCalled()

    component.setProps({ documentTitle: 'foo' })

    expect(mockSetDocumentTitle).toHaveBeenCalledWith('foo')
    expect(mockTrackPageView).toHaveBeenCalledWith('foo')
  })
})
