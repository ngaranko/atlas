import React from 'react'
import { FooterLinkList, FooterLinkListItem, Link } from '@datapunt/asc-ui'

const SocialLinks = ({ links }) => (
  <FooterLinkList>
    {links &&
      links.map(({ id, title, href }) => (
        <FooterLinkListItem key={id}>
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

export default SocialLinks
