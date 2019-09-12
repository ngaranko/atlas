import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from '@datapunt/asc-core'
import {
  CardContainer,
  Heading,
  Paragraph,
  Card,
  Link,
  CardContent,
  styles,
} from '@datapunt/asc-ui'

const OrganizationLinkCardStyle = styled(CardContainer)`
  border-top: 2px solid;
`
const StyledCard = styled(Card)`
  align-items: flex-start;
  height: 100%;
  ${({ loading }) =>
    !loading &&
    css`
      background-color: inherit;
    `}
`

const StyledLink = styled(Link)`
  margin-top: 24px;
`

const StyledCardContent = styled(CardContent)`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;

  ${styles.HeadingStyle} {
    margin: 12px 0 24px;
  }
`

const OrganizationLinkCard = ({ loading, showError, title, description, href }) => (
  <OrganizationLinkCardStyle>
    <StyledCard animateLoading={!showError} loading={loading}>
      <StyledCardContent>
        <div>
          <Heading $as="h4" styleAs="h3">
            {title}
          </Heading>
          <Paragraph>{description}</Paragraph>
        </div>
        <StyledLink linkType="with-chevron" href={href}>
          Lees meer
        </StyledLink>
      </StyledCardContent>
    </StyledCard>
  </OrganizationLinkCardStyle>
)

OrganizationLinkCard.defaultProps = {
  loading: false,
  showError: false,
}

OrganizationLinkCard.propTypes = {
  loading: PropTypes.bool,
  showError: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default OrganizationLinkCard
