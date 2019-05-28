import matomoTracker from '../../shared/services/piwik-tracker/piwik-tracker';
import { PIWIK_CONSTANTS as MATOMO_CONSTANTS } from '../../store/middleware/piwik/piwikMiddleware';

function useMatomo() {
  const trackPageView = (title) => {
    const href = window.location.href;
    matomoTracker([MATOMO_CONSTANTS.TRACK_VIEW,
      title,
      href,
      null], href, title);

    return title;
  };

  return {
    trackPageView
  };
}

export default useMatomo;
