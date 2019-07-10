import piwikTracker from '../../../shared/services/piwik-tracker/piwik-tracker'
import { getEnvironment } from '../../../shared/environment'
// eslint-disable-next-line import/no-cycle
import trackEvents from './trackEvents'
// eslint-disable-next-line import/no-cycle
import trackViews from './trackViews'
import { authCustomDimensions, viewCustomDimensions } from './customDimensions'
import { PIWIK_CONFIG } from './constants'

// Initialize connection with Piwik
export const initializePiwik = () => {
  const urlBase = 'https://piwik.data.amsterdam.nl/'

  window._paq = window._paq || []

  if (window._paq.length === 0) {
    window._paq.push(['enableLinkTracking'])
    window._paq.push(['setTrackerUrl', `${urlBase}piwik.php`])
    window._paq.push([
      'setSiteId',
      PIWIK_CONFIG[getEnvironment(window.location.hostname)].SITE_ID,
    ])

    const doc = document
    const piwik = doc.createElement('script')
    const scripts = doc.getElementsByTagName('script')[0]

    piwik.type = 'text/javascript'
    piwik.async = true
    piwik.defer = true
    piwik.src = `${urlBase}piwik.js`

    scripts.parentNode.insertBefore(piwik, scripts)
  }
}

// Execute Piwik actions
const piwikMiddleware = ({ getState }) => next => action => {
  initializePiwik()
  const nextAction = action

  const actionsToPiwik = []
  if (trackViews[action.type]) {
    actionsToPiwik.push(trackViews[action.type])
  }
  if (trackEvents[action.type]) {
    actionsToPiwik.push(trackEvents[action.type])
  }

  if (actionsToPiwik.length) {
    const { firstAction, location, query, tracking } = action.meta || {}
    const state = getState()

    const { href } = window.location
    const { title } = window.document

    if (tracking || location) {
      const customDimensions = [
        ...authCustomDimensions(state),
        ...viewCustomDimensions(query, state),
      ]

      actionsToPiwik.forEach(piwikAction => {
        piwikTracker(
          piwikAction({
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

export default piwikMiddleware
