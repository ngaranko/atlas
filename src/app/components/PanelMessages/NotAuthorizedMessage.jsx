import React from 'react'
import PropTypes from 'prop-types'
import Link from 'redux-first-router-link'
import { routing } from '../../routes'
import Notification from '../../../shared/components/notification/Notification'
import { BEDIENING_LOGIN_DEEPLINK } from '../../../shared/ducks/content/constants'

const NotAuthorizedMessage = ({ scopeError }) => {
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
        {scopeError === 'BRK/RSN' ? (
          <p className="c-panel__paragraph">
            Medewerkers met speciale bevoegdheden kunnen inloggen om kadastrale
            objecten met zakelijk rechthebbenden te bekijken.
          </p>
        ) : (
          <p className="c-panel__paragraph">
            Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om
            maatschappelijke activiteiten en vestigingen te bekijken.
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
  scopeError: '',
}

NotAuthorizedMessage.propTypes = {
  scopeError: PropTypes.string,
}

export default NotAuthorizedMessage
