import matomoTracker from '../../shared/services/matomo-tracker/matomo-tracker'
import { MATOMO_CONSTANTS } from '../../store/middleware/matomo/constants'

function useMatomo() {
  const { href } = window.location

  const trackPageView = documentTitle => {
    matomoTracker(
      [MATOMO_CONSTANTS.TRACK_VIEW, documentTitle, href, null],
      href,
      documentTitle,
    )

    return documentTitle
  }

  const trackEvent = (documentTitle, category, action, name = null) => {
    matomoTracker(
      [MATOMO_CONSTANTS.TRACK_EVENT, category, action, name],
      href,
      documentTitle,
    )
  }

  return {
    trackEvent,
    trackPageView,
  }
}

export default useMatomo
