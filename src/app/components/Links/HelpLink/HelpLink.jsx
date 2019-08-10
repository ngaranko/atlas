import React from 'react'
import RouterLink from 'redux-first-router-link'
import { routing } from '../../../routes'

const HelpLink = () => (
  <RouterLink
    className="c-link--light"
    to={{
      type: routing.bediening.type,
      payload: {},
    }}
  >
    Lees meer in de help
  </RouterLink>
)

export default HelpLink
