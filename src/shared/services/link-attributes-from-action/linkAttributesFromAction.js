import { selectLocationState } from 'redux-first-router'
import toUrl from 'redux-first-router-link/dist/toUrl'

/**
 * Executes the function when the passed event is not a special key.
 * Prevents the navigation to href.
 * When the control key is pressed, navigates to href in a new window
 *
 * @param {*} fn - the function to execute
 */
export const withPreventDefault = fn => e => {
  const openInNewTab = e.ctrlKey || e.metaKey
  if (!openInNewTab) {
    e.preventDefault()
    fn()
  }
}

/**
 *
 * @param {*} actionCreatorFn - an navigation action creator (from store/redux-first-router/actions)
 * @returns Returns the navigation attributes for an anchor link based on the
 *          redux navigation action
 */
const linkAttributesFromAction = actionCreatorFn => {
  const state = window.reduxStore.getState()
  const { dispatch } = window.reduxStore
  const { routesMap } = selectLocationState(state)
  return {
    href: toUrl(actionCreatorFn, routesMap),
    onClick: withPreventDefault(() => dispatch(actionCreatorFn)),
  }
}

export default linkAttributesFromAction
