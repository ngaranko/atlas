import React from 'react'
import PropTypes from 'prop-types'
import Link from 'redux-first-router-link'
import { routing } from '../../routes'
import Notification from '../../../shared/components/notification/Notification'
import { BEDIENING_LOGIN_DEEPLINK } from '../../../shared/ducks/content/constants'

const MoreResultsWhenLoggedIn = ({ excludedResults }) => (
  <Notification type="info">
    <h3 className="c-panel__title">Meer resultaten na inloggen</h3>
    <p className="c-panel__paragraph">
      {'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om ' +
        `meer te vinden${excludedResults ? `: ${excludedResults}` : ''}. Zie `}
      <Link
        className="c-link--light qa-link-to-page-button qa-dp-link"
        to={{
          type: routing.bediening.type,
          payload: { deeplink: BEDIENING_LOGIN_DEEPLINK },
        }}
      >
        Help &#62; Bediening &#62; Inloggen
      </Link>
    </p>
  </Notification>
)

MoreResultsWhenLoggedIn.defaultProps = {
  excludedResults: '',
}

MoreResultsWhenLoggedIn.propTypes = {
  excludedResults: PropTypes.string,
}

export default MoreResultsWhenLoggedIn
