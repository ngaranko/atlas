/* eslint-disable no-nested-ternary */
import React from 'react'
import {
  FooterLinkList,
  FooterLinkListItem,
  Paragraph,
  Link,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import ActionLink from '../Links/ActionLink/ActionLink'
import { toArticleDetail } from '../../../store/redux-first-router/actions'
import { openFeedbackForm } from '../Modal/FeedbackModal'

const ArticleLink = ({ title, id, slug }) => (
  <ActionLink title={title} to={toArticleDetail(id, slug)} variant="with-chevron">
    {title}
  </ActionLink>
)

export const FeedbackLink = styled(Link).attrs({
  type: 'button',
})`
  background-color: ${themeColor('tint', 'level5')};
`

const StyledParagraph = styled(Paragraph)`
  margin-bottom: ${themeSpacing(5)};
`

const HelpLinks = ({ links }) => (
  <>
    <StyledParagraph>
      Heeft u een vraag en kunt u het antwoord niet vinden op deze website? Of heeft u bevindingen?
      Neem dan contact met ons op.
    </StyledParagraph>
    <FooterLinkList>
      {links &&
        links.map(({ id, title, href, slug, order }) => (
          <FooterLinkListItem key={id} order={order}>
            {!href && id ? (
              <ActionLink
                title={title}
                to={toArticleDetail(id[process.env.NODE_ENV], slug)}
                variant="with-chevron"
              >
                {title}
              </ActionLink>
            ) : (
              <Link
                title={title}
                href={href}
                rel="external noopener noreferrer"
                target="_blank"
                variant="with-chevron"
              >
                {title}
              </Link>
            )}
            <FeedbackLink
              $as="button"
              title="Feedback geven"
              variant="with-chevron"
              onClick={openFeedbackForm}
            >
              Feedback geven
            </FeedbackLink>
          </FooterLinkListItem>
        ))}
    </FooterLinkList>
  </>
)

export default HelpLinks
