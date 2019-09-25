import React from 'react'
import { Link } from '@datapunt/asc-ui'
import RouterLink from 'redux-first-router-link'

const RouterLinkWrapper = ({ to, className, children }) => (
  <RouterLink to={to} className={className}>
    {children}
  </RouterLink>
)

const ActionLink = ({ children, ...otherProps }) => (
  <Link $as={RouterLinkWrapper} {...otherProps}>
    {children}
  </Link>
)

export default ActionLink
