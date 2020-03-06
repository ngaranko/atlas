/* eslint-disable no-nested-ternary */
import styled from '@datapunt/asc-core'
import { FooterLinkListItem, Link, Paragraph, themeSpacing } from '@datapunt/asc-ui'
import React from 'react'
import { openFeedbackForm } from '../Modal/FeedbackModal'

import FooterLinks from './FooterLinks'

const StyledParagraph = styled(Paragraph)`
  margin-bottom: ${themeSpacing(5)};
`

const HelpLinks = ({ links }) => (
  <>
    <StyledParagraph>
      Heeft u een vraag en kunt u het antwoord niet vinden op deze website? Of heeft u bevindingen?
      Neem dan contact met ons op.
    </StyledParagraph>
    <FooterLinks links={links}>
      <FooterLinkListItem order={3}>
        <Link
          type="button"
          forwardedAs="button"
          title="Feedback geven"
          variant="with-chevron"
          onClick={openFeedbackForm}
        >
          Feedback geven
        </Link>
      </FooterLinkListItem>
    </FooterLinks>
  </>
)

export default HelpLinks
