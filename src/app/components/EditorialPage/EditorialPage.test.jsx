import React from 'react'
import { mount, shallow } from 'enzyme'
import EditorialPage from './EditorialPage'
import useMatomo from '../../utils/useMatomo'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'
import useDocumentTitle from '../../utils/useDocumentTitle'

jest.mock('../../../shared/services/link-attributes-from-action/linkAttributesFromAction')
jest.mock('../../utils/useDocumentTitle')
jest.mock('../../utils/useMatomo')

describe('EditorialPage', () => {
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

    component = shallow(<EditorialPage linkAction={{}} />).dive()
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
    component = mount(<EditorialPage linkAction={{}} documentTitle="" />)

    expect(mockSetDocumentTitle).not.toHaveBeenCalled()
    expect(mockTrackPageView).not.toHaveBeenCalled()

    component.setProps({ documentTitle: 'foo' })

    expect(mockSetDocumentTitle).toHaveBeenCalledWith('foo')
    expect(mockTrackPageView).toHaveBeenCalledWith('foo')
  })
})
