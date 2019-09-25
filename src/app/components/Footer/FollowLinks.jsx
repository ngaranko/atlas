import React from 'react'
import { FooterLinkList, FooterLinkListItem, Link } from '@datapunt/asc-ui'
import { followLinks } from './services/footer-links'

const FollowLinks = () => (
  <FooterLinkList>
    {followLinks.map(({ title, href }) => (
      <FooterLinkListItem key={title}>
        <Link
          title={title}
          href={href}
          rel="external noopener noreferrer"
          target="_blank"
          variant="with-chevron"
        >
          {title}
        </Link>
      </FooterLinkListItem>
    ))}
  </FooterLinkList>
)

export default FollowLinks
