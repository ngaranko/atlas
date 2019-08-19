/**
 * @jest-environment jsdom-global
 */
import MatomoTracker from '@datapunt/matomo-tracker-js'
import useMatomo from './useMatomo'

jest.mock('@datapunt/matomo-tracker-js')

describe('useMatomo', () => {
  describe('trackPageView', () => {
    const trackPageViewMock = jest.fn()
    const trackEventMock = jest.fn()

    beforeEach(() => {
      MatomoTracker.mockImplementation(() => ({
        trackPageView: trackPageViewMock,
        trackEvent: trackEventMock,
      }))
    })

    it('should call MatomoTracker with the right parameters for page views', () => {
      const documentTitle = 'The documentTitle'
      const url = 'https://www.someurl.com/foo/bar'
      jsdom.reconfigure({ url })
      const { trackPageView } = useMatomo()

      trackPageView(documentTitle)

      expect(trackPageViewMock).toHaveBeenCalledWith({ documentTitle })
    })

    it('should call MatomoTracker with the right parameters for events', () => {
      const { trackEvent } = useMatomo()

      const documentTitle = 'The documentTitle'
      const action = 'track'
      const name = 'this'
      const value = 'value 123'

      trackEvent(documentTitle, action, name, value)

      expect(trackEventMock).toHaveBeenCalledWith({ documentTitle, action, name, value })
    })
  })
})
