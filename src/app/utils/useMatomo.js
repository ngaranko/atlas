import MatomoTracker from '@datapunt/matomo-tracker-js'
import { MATOMO_CONFIG } from '../../store/middleware/matomo/constants'
import { getEnvironment } from '../../shared/environment'

function useMatomo() {
  // Initialize connection with Matomo
  const MatomoInstance = new MatomoTracker({
    urlBase: MATOMO_CONFIG.BASE_URL,
    siteId: MATOMO_CONFIG[getEnvironment(window.location.hostname)].SITE_ID,
  })

  const trackPageView = documentTitle => MatomoInstance.trackPageView({ documentTitle })

  const trackEvent = (documentTitle, action, name, value = null) =>
    MatomoInstance.trackEvent({ action, name, value, documentTitle })

  return {
    trackEvent,
    trackPageView,
  }
}

export default useMatomo
