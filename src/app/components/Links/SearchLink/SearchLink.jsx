import React from 'react'
import RouterLink from 'redux-first-router-link'
import styled from '@datapunt/asc-core'
import { Link, themeColor, svgFill, styles } from '@datapunt/asc-ui'

const StyledLink = styled(Link)`
  color: ${themeColor('primary')};
  cursor: pointer;

  ${styles.IconStyle} {
    ${svgFill('primary')}
  }
`

const SearchLink = ({ to, label, title = '' }) => (
  <StyledLink variant="with-chevron" forwardedAs={RouterLink} to={to} title={title || label}>
    {label}
  </StyledLink>
)

export default SearchLink
