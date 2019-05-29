import matomoTracker from '../../shared/services/piwik-tracker/piwik-tracker';
import { PIWIK_CONSTANTS as MATOMO_CONSTANTS } from '../../store/middleware/piwik/piwikMiddleware';

function useMatomo() {
  const href = window.location.href;

  const trackPageView = (documentTitle) => {
    matomoTracker([MATOMO_CONSTANTS.TRACK_VIEW,
      documentTitle,
      href,
      null], href, documentTitle);

    return documentTitle;
  };

  const trackEvent = (documentTitle, category, action, name = null) => {
    matomoTracker([MATOMO_CONSTANTS.TRACK_EVENT,
      category,
      action,
      name], href, documentTitle);
  };

  return {
    trackEvent,
    trackPageView
  };
}

export default useMatomo;
