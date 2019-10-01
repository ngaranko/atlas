import React from 'react'
import { FooterLinkList, FooterLinkListItem } from '@datapunt/asc-ui'
import { toArticleDetail } from '../../../store/redux-first-router/actions'
import ActionLink from '../Links/ActionLink/ActionLink'

const ColofonLinks = ({ links }) => (
  <FooterLinkList>
    {links &&
      links.map(({ title, id, slug }) => {
        const linkId = id[process.env.NODE_ENV]
        return (
          <FooterLinkListItem key={linkId}>
            <ActionLink title={title} to={toArticleDetail(linkId, slug)} variant="with-chevron">
              {title}
            </ActionLink>
          </FooterLinkListItem>
        )
      })}
  </FooterLinkList>
)

export default ColofonLinks
