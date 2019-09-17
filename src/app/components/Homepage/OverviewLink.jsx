import React from 'react'
import styled from '@datapunt/asc-core'
import { breakpoint, Link, themeSpacing } from '@datapunt/asc-ui'

const StyledLink = styled(Link)`
  margin-top: ${themeSpacing(4)};
  padding: ${themeSpacing(2)} ${themeSpacing(1)} ${themeSpacing(2)} 0;

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin-top: ${themeSpacing(6)};
  }
`

const OverviewLink = ({ label, href }) => (
  <StyledLink linkType="with-chevron" href={href}>
    {label}
  </StyledLink>
)

export default OverviewLink
