// Configure environment variables
import { ENVIRONMENTS } from '../../../shared/environment'

export const PIWIK_CONFIG = {
  [ENVIRONMENTS.PRODUCTION]: {
    SITE_ID: 1,
  },
  [ENVIRONMENTS.PRE_PRODUCTION]: {
    SITE_ID: 3,
  },
  [ENVIRONMENTS.ACCEPTANCE]: {
    SITE_ID: 3,
  },
  [ENVIRONMENTS.DEVELOPMENT]: {
    SITE_ID: 3,
  },
}
export const PIWIK_CONSTANTS = {
  TRACK_EVENT: 'trackEvent',
  TRACK_SEARCH: 'trackSiteSearch',
  TRACK_VIEW: 'trackPageView',
}
