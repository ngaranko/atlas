import styled, { css } from '@datapunt/asc-core'
import {
  breakpoint,
  Heading,
  ImageCard,
  ImageCardContent,
  Link,
  styles,
  themeColor,
} from '@datapunt/asc-ui'
import React from 'react'
import { focusOutline } from './services/styles'

const HighlightCardHeadingStyle = styled(Heading)`
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
      ${focusOutline()}
    }
  }
`

const HighlightCard = ({ loading, showError, title, href, backgroundImage, ...otherProps }) => (
  <StyledLink href={href} linkType="blank">
    <ImageCard backgroundImage={backgroundImage} loading={loading} animateLoading={!showError}>
      <ImageCardContent>
        <HighlightCardHeadingStyle $as="h4" {...otherProps}>
          {title}
        </HighlightCardHeadingStyle>
      </ImageCardContent>
    </ImageCard>
  </StyledLink>
)

export default HighlightCard
