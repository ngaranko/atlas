import React from 'react'
import styled, { css } from '@datapunt/asc-core'
import { breakpoint, Heading, ImageCardContent, ImageCard, Link } from '@datapunt/asc-ui'

export const HighlightsHeadingStyle = styled(Heading)`
  @media screen and ${breakpoint('max-width', 'tabletM')} {
    font-size: 16px;
    line-height: 20px;
  }

  @media screen and ${breakpoint('min-width', 'tabletM')} and ${breakpoint(
  'max-width',
  'laptopM',
)} {
      font-size: 14px;
      line-height: 17px;
    }

    ${({ large }) =>
      large &&
      css`
      @media screen and ${breakpoint('max-width', 'laptopM')} {
      font-size: 16px;
      line-height: 20px;`}

`

const HighlightsHeading = ({ children, ...otherProps }) => (
  <HighlightsHeadingStyle $as="h4" {...otherProps}>
    {children}
  </HighlightsHeadingStyle>
)

const HightlightLinkCard = ({
  loading,
  showError,
  title,
  href,
  backgroundImage,
  ...otherProps
}) => (
  <Link href={href} linkType="blank">
    <ImageCard
      margin={12}
      backgroundImage={backgroundImage}
      loading={loading}
      animateLoading={!showError}
    >
      <ImageCardContent>
        <HighlightsHeading {...otherProps}>{title}</HighlightsHeading>
      </ImageCardContent>
    </ImageCard>
  </Link>
)

export default HightlightLinkCard
