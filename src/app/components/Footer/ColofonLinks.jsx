import React from 'react'
import { FooterLinkList, FooterLinkListItem, Link } from '@datapunt/asc-ui'
import { colofonLinks } from './services/footer-links'

const ColofonLinks = () => (
  <FooterLinkList>
    {colofonLinks.map(({ title, href }) => (
      <FooterLinkListItem>
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

export default ColofonLinks
