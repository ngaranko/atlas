import React from 'react'
import styled from '@datapunt/asc-core'
import { themeSpacing } from '@datapunt/asc-ui'
import Notification from '../../../shared/components/notification/Notification'

const StyledNotification = styled(Notification)`
  padding: ${themeSpacing(6, 5)};
  margin-bottom: ${themeSpacing(
    10,
  )} !important; // This can be deleted when the Notifications will be refactored to be styled-components
`

const MaxSearchPageMessage = () => (
  <StyledNotification type="info">
    <p>
      Er zijn meer resultaten, om technische redenen kunnen alleen de eerste 10 pagina’s worden
      getoond.
    </p>
    <p>Tip: Verfijn de zoekopdracht om het het aantal resultaten te verkleinen.</p>
  </StyledNotification>
)

MaxSearchPageMessage.defaultProps = {
  excludedResults: '',
}

export default MaxSearchPageMessage
