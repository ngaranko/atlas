import React from 'react'
import styled, { css } from '@datapunt/asc-core'
import {
  breakpoint,
  Heading,
  ImageCardContent,
  ImageCard,
  Link,
  styles,
  themeColor,
} from '@datapunt/asc-ui'
import { focusImage } from './services/styles'

export const HighlightCardHeadingStyle = styled(Heading)`
  margin: 0;

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    font-size: 16px;
    line-height: 1;

    ${({ large }) =>
      large &&
      css`
        font-size: 16px;
        line-height: 20px;
      `}

  @media screen and ${breakpoint('min-width', 'tabletM')} and ${breakpoint(
  'max-width',
  'laptopM',
)} {
      font-size: 14px;
      line-height: 17px;
    }

`

const StyledLink = styled(Link)`
  position: relative;
  width: 100%;

  &:hover {
    ${HighlightCardHeadingStyle} {
      color: ${themeColor('secondary')};
      text-decoration: underline;
    }
  }

  &:focus {
    background: none;

    ${/* sc-selector */ styles.ImageCardStyle}::after {
      ${focusImage()}
    }
  }
`

const HighlightCardHeading = ({ children, ...otherProps }) => (
  <HighlightCardHeadingStyle $as="h4" {...otherProps}>
    {children}
  </HighlightCardHeadingStyle>
)

const HighlightCard = ({ loading, showError, title, href, backgroundImage, ...otherProps }) => (
  <StyledLink href={href} linkType="blank">
    <ImageCard backgroundImage={backgroundImage} loading={loading} animateLoading={!showError}>
      <ImageCardContent>
        <HighlightCardHeading {...otherProps}>{title}</HighlightCardHeading>
      </ImageCardContent>
    </ImageCard>
  </StyledLink>
)

export default HighlightCard
