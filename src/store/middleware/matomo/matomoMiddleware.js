import matomoTracker from '../../../shared/services/matomo-tracker/matomo-tracker'
import { getEnvironment } from '../../../shared/environment'
// eslint-disable-next-line import/no-cycle
import trackEvents from './trackEvents'
// eslint-disable-next-line import/no-cycle
import trackViews from './trackViews'
import { authCustomDimensions, viewCustomDimensions } from './customDimensions'
import { MATOMO_CONFIG } from './constants'

// Initialize connection with Matomo
export const initializeMatomo = () => {
  const urlBase = 'https://analytics.data.amsterdam.nl/'

  window._paq = window._paq || []

  if (window._paq.length === 0) {
    window._paq.push(['enableLinkTracking'])
    window._paq.push(['setTrackerUrl', `${urlBase}matomo.php`])
    window._paq.push(['setSiteId', MATOMO_CONFIG[getEnvironment(window.location.hostname)].SITE_ID])

    const doc = document
    const matomo = doc.createElement('script')
    const scripts = doc.getElementsByTagName('script')[0]

    matomo.type = 'text/javascript'
    matomo.async = true
    matomo.defer = true
    matomo.src = `${urlBase}matomo.js`

    scripts.parentNode.insertBefore(matomo, scripts)
  }
}

// Execute Matomo actions
const matomoMiddleware = ({ getState }) => next => action => {
  initializeMatomo()
  const nextAction = action

  const actionsToMatomo = []
  if (trackViews[action.type]) {
    actionsToMatomo.push(trackViews[action.type])
  }
  if (trackEvents[action.type]) {
    actionsToMatomo.push(trackEvents[action.type])
  }

  if (actionsToMatomo.length) {
    const { firstAction, location, query, tracking } = action.meta || {}
    const state = getState()

    const { href } = window.location
    const { title } = window.document

    if (tracking || location) {
      const customDimensions = [
        ...authCustomDimensions(state),
        ...viewCustomDimensions(query, state),
      ]

      actionsToMatomo.forEach(matomoAction => {
        matomoTracker(
          matomoAction({
            tracking,
            firstAction,
            query,
            state,
            title,
            href,
          }),
          href,
          title,
          customDimensions,
        )
      })
    }
  }
  next(nextAction)
}

export default matomoMiddleware
