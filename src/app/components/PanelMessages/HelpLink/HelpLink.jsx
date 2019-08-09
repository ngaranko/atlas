import React from 'react'
import Link from 'redux-first-router-link'
import { routing } from '../../../routes'

const HelpLink = () => (
  <Link
    className="c-link--light"
    to={{
      type: routing.bediening.type,
      payload: {},
    }}
  >
    Lees meer in de help
  </Link>
)

export default HelpLink
