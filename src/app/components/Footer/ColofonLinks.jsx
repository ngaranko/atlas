import React from 'react'
import { FooterLinkList, FooterLinkListItem } from '@datapunt/asc-ui'
import { colofonLinks } from './services/footer-links'
import { toArticleDetail } from '../../../store/redux-first-router/actions'
import ActionLink from '../Links/ActionLink/ActionLink'

const ColofonLinks = () => (
  <FooterLinkList>
    {colofonLinks.map(({ title, id, slug }) => (
      <FooterLinkListItem key={slug}>
        <ActionLink title={title} to={toArticleDetail(id, slug)} variant="with-chevron">
          {title}
        </ActionLink>
      </FooterLinkListItem>
    ))}
  </FooterLinkList>
)

export default ColofonLinks
