import React from 'react'
import PropTypes from 'prop-types'
import styled from '@datapunt/asc-core'
import { Heading, themeColor, themeSpacing } from '@datapunt/asc-ui'
import Notification from '../../../shared/components/notification/Notification'
import LoginLinkContainer from '../Links/LoginLink/LoginLinkContainer'

const StyledNotification = styled(Notification)`
  padding: ${themeSpacing(6, 5)};
`

const StyledHeading = styled(Heading)`
  color: ${themeColor('tint', 'level1')};
`

const MoreResultsWhenLoggedIn = ({ excludedResults }) => (
  <StyledNotification type="info">
    <StyledHeading forwardedAs="h3">Meer resultaten na inloggen</StyledHeading>
    <p>
      {'Medewerkers/ketenpartners van Gemeente Amsterdam kunnen inloggen om ' +
        `meer te vinden${excludedResults ? `: ${excludedResults}` : ''}. `}
    </p>
    <LoginLinkContainer />
  </StyledNotification>
)

MoreResultsWhenLoggedIn.defaultProps = {
  excludedResults: '',
}

MoreResultsWhenLoggedIn.propTypes = {
  excludedResults: PropTypes.string,
}

export default MoreResultsWhenLoggedIn
