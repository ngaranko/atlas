import styled, { css } from '@datapunt/asc-core'
import {
  breakpoint,
  Card,
  CardContent,
  CardMedia,
  Heading,
  Image,
  Link,
  Paragraph,
  styles,
  Tag,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import PropTypes from 'prop-types'
import React from 'react'

const StyledLink = styled(Link)`
  border-bottom: ${themeColor('tint', 'level3')} 1px solid;
  width: 100%;
  min-height: 66px;

  &:hover {
    border-bottom: ${themeColor('secondary')} 1px solid;

    ${styles.HeadingStyle} {
      color: ${themeColor('secondary')};
      text-decoration: underline;
    }
  }
`

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${themeSpacing(2)} 0;
  margin: ${themeSpacing(6)} 0;
  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin: ${themeSpacing(6, 2)};
  }
  ${({ showError }) =>
    !showError &&
    css`
      background: none;
    `}
`
const StyledCardContent = styled(CardContent)`
  padding: 0;
  margin-right: ${themeSpacing(4)};
`

const StyledCardMedia = styled(CardMedia)`
  max-width: 80px;
  align-self: flex-start;
`
const StyledTag = styled(Tag)`
  display: inline;
  margin-right: ${themeSpacing(1)};
`

const SpecialCard = ({
  loading,
  showError,
  title,
  tag,
  href,
  description,
  imageSrc,
  imageAlt,
  ...otherProps
}) => (
  <StyledLink href={href} linkType="blank" {...otherProps}>
    <StyledCard horizontal animateLoading={!showError} loading={loading}>
      <StyledCardContent>
        <Heading $as="h4" styleAs="h3" gutterBottom={8}>
          {title}
        </Heading>
        <Paragraph>
          <StyledTag colorType="tint" colorSubtype="level3">
            {tag}
          </StyledTag>
          {description}
        </Paragraph>
      </StyledCardContent>
      <StyledCardMedia>
        <Image src={imageSrc} alt={imageAlt} square />
      </StyledCardMedia>
    </StyledCard>
  </StyledLink>
)

SpecialCard.defaultProps = {
  loading: false,
  showError: false,
}

SpecialCard.propTypes = {
  loading: PropTypes.bool,
  showError: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

export default SpecialCard
