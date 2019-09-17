import React from 'react'
import styled from '@datapunt/asc-core'
import { breakpoint, themeColor, Column, Heading, Row } from '@datapunt/asc-ui'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'
import { fullGridWidthContainer } from './services/styles'
import organizationLinks from './services/organization-links'
import OrganizationLinkCard from './OrganizationLinkCard'

const OrganizationBlockStyle = styled.div`
  padding: 40px 20px 0;
  background-color: ${themeColor('tint', 'level2')};
  ${({ hasMargin }) => fullGridWidthContainer(hasMargin)}
`

const StyledRow = styled(Row)`
  ${({ showError }) => showError && ErrorBackgroundCSS}
  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin-top: 12px;
  }
`

const OrganizationBlock = ({ loading, showError, ...otherProps }) => (
  <OrganizationBlockStyle {...otherProps}>
    <Row hasMargin={false}>
      <Heading $as="h2" styleAs="h1" gutterBottom={20}>
        Onderzoek, Informatie en Statistiek
      </Heading>
    </Row>
    <StyledRow hasMargin={false} showError={showError}>
      {showError && <ErrorMessage onClick={() => {}} />}
      {organizationLinks.map(linkProps => (
        <Column span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
          <OrganizationLinkCard loading={loading} showError={showError} {...linkProps} />
        </Column>
      ))}
    </StyledRow>
  </OrganizationBlockStyle>
)

export default OrganizationBlock
