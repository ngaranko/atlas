import React from 'react'
import { FooterLinkList, FooterLinkListItem, Paragraph, Link } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import { cmsIds, VEELGESTELDE_VRAGEN } from '../../../shared/services/cms/cms.config'
import ActionLink from '../Links/ActionLink/ActionLink'
import { toArticleDetail } from '../../../store/redux-first-router/actions'
import { openFeedbackForm } from '../Modal/FeedbackModal'

const FAQ_LINK = {
  title: 'Veelgestelde vragen',
  id: cmsIds[VEELGESTELDE_VRAGEN],
  slug: VEELGESTELDE_VRAGEN,
}

const CONTACT_LINK = {
  title: 'Contact opnemen',
  href: 'https://www.amsterdam.nl/ois/contact/',
}

const HELP_LINK = {
  title: 'Uitleg gebruik',
  id: cmsIds[VEELGESTELDE_VRAGEN],
  slug: VEELGESTELDE_VRAGEN,
}

const ArticleLink = ({ title, id, slug }) => (
  <ActionLink title={title} to={toArticleDetail(id, slug)} variant="with-chevron">
    {title}
  </ActionLink>
)

const FeedbackLink = styled(Link)`
  cursor: pointer;
`

const HelpLinks = () => (
  <>
    <Paragraph gutterBottom={8}>
      Heeft u een vraag en kunt u het antwoord niet vinden op deze website? Of heeft u bevindingen?
      Neem dan contact met ons op.
    </Paragraph>
    <FooterLinkList>
      <FooterLinkListItem>
        <ArticleLink {...FAQ_LINK} />
      </FooterLinkListItem>
      <FooterLinkListItem>
        <Link
          rel="external noopener noreferrer"
          target="_blank"
          variant="with-chevron"
          {...CONTACT_LINK}
        >
          {CONTACT_LINK.title}
        </Link>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <FeedbackLink title="Feedback geven" variant="with-chevron" onClick={openFeedbackForm}>
          Feedback geven
        </FeedbackLink>
      </FooterLinkListItem>
      <FooterLinkListItem>
        <ArticleLink {...HELP_LINK} />
      </FooterLinkListItem>
    </FooterLinkList>
  </>
)

export default HelpLinks
