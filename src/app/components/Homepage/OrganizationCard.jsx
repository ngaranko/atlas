import styled, { css } from '@datapunt/asc-core'
import {
  Card,
  CardContent,
  Heading,
  Link,
  Paragraph,
  themeSpacing,
  breakpoint,
} from '@datapunt/asc-ui'
import PropTypes from 'prop-types'
import React from 'react'

const StyledCard = styled(Card)`
  border-top: 2px solid;
  align-items: flex-start;
  height: 100%;
  margin-bottom: 0px !important; // Check why the Card has a margin-bottom
  ${({ loading }) =>
    !loading &&
    css`
      background-color: inherit;
    `}
`

const StyledCardContent = styled(CardContent)`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledHeading = styled(Heading)`
  margin: ${themeSpacing(3)} 0 ${themeSpacing(6)};
`

const StyledParagraph = styled(Paragraph)`
  height: 100%;

  // check where and WHY the margin-bottom rule is overriden in @datapunt/asc-ui
  margin-bottom: ${themeSpacing(6)} !important;
`

const StyledLink = styled(Link)`
  margin-bottom: ${themeSpacing(5)};

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    margin-bottom: ${themeSpacing(10)};
  }
`

const OrganizationCard = ({ loading, showError, title, description, href, ...otherProps }) => (
  <StyledCard animateLoading={!showError} loading={loading} {...otherProps}>
    <StyledCardContent>
      <StyledHeading $as="h4" styleAs="h3">
        {title}
      </StyledHeading>
      <StyledParagraph>{description}</StyledParagraph>
      <StyledLink linkType="with-chevron" href={href}>
        Lees meer
      </StyledLink>
    </StyledCardContent>
  </StyledCard>
)

OrganizationCard.defaultProps = {
  loading: false,
  showError: false,
}

OrganizationCard.propTypes = {
  loading: PropTypes.bool,
  showError: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default OrganizationCard
