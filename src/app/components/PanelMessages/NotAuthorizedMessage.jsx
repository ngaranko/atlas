import React from 'react'
import PropTypes from 'prop-types'
import Link from 'redux-first-router-link'
import { routing } from '../../routes'
import Notification from '../../../shared/components/notification/Notification'
import { BEDIENING_LOGIN_DEEPLINK } from '../../../shared/ducks/content/constants'
import { SCOPES } from '../../../shared/services/auth/auth'

const NotAuthorizedMessage = ({ scopeError, type }) => {
  const link = (
    <Link
      className="c-link--light qa-link-to-page-button qa-dp-link"
      to={{
        type: routing.bediening.type,
        payload: { deeplink: BEDIENING_LOGIN_DEEPLINK },
      }}
    >
      Help &#62; Bediening &#62; Inloggen
    </Link>
  )

  return (
    <Notification type="warning">
      <div>
        {scopeError === SCOPES['BRK/RSN'] ? (
          <p className="c-panel__paragraph">
            Medewerkers met speciale bevoegdheden kunnen inloggen om kadastrale
            objecten met zakelijk rechthebbenden te bekijken.
          </p>
        ) : (
          <p className="c-panel__paragraph">
            Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om {type} te bekijken.
          </p>
        )}
        <p className="c-panel__paragraph">
          {`Zie `}
          {link}
        </p>
      </div>
    </Notification>
  )
}

NotAuthorizedMessage.defaultProps = {
  type: 'maatschappelijke activiteiten en vestigingen',
  scopeError: '',
}

NotAuthorizedMessage.propTypes = {
  type: PropTypes.string,
  scopeError: PropTypes.string,
}

export default NotAuthorizedMessage
