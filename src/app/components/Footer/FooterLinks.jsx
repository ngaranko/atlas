import React from 'react'
import { FooterLinkList, FooterLinkListItem, Link } from '@datapunt/asc-ui'
import RouterLink from 'redux-first-router-link'
import { toArticleDetail } from '../../../store/redux-first-router/actions'

const FooterLinks = ({ children, links }) => (
  <FooterLinkList>
    {links &&
      links.map(({ title, id, href, slug, order }) => {
        const linkId = !href ? id[process.env.NODE_ENV] : id

        return (
          <FooterLinkListItem key={linkId} order={order}>
            {!href ? (
              <Link
                as={RouterLink}
                title={title}
                to={toArticleDetail(linkId, slug)}
                variant="with-chevron"
              >
                {title}
              </Link>
            ) : (
              <Link
                key={linkId}
                title={title}
                href={href}
                rel="external noopener noreferrer"
                target="_blank"
                variant="with-chevron"
              >
                {title}
              </Link>
            )}
          </FooterLinkListItem>
        )
      })}
    {children}
  </FooterLinkList>
)

export default FooterLinks
