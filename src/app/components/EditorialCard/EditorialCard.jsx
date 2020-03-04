import React from 'react'
import styled, { ascDefaultTheme } from '@datapunt/asc-core'
import {
  Card,
  CardContent,
  CardMedia,
  Link,
  Heading,
  Paragraph,
  Image,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import getImageFromCms from '../../utils/getImageFromCms'

const notFoundImage = '/assets/images/not_found_thumbnail.jpg'

const StyledHeading = styled(Heading)`
  // By forwarding this component as h4, we need to overwrite the style rules in src/shared/styles/base/_typography.scss
  line-height: 22px;
  margin-bottom: ${({ hasMarginBottom }) => hasMarginBottom && themeSpacing(3)};
  ${({ compact }) => compact && 'font-size: 16px;'}
  width: fit-content;
  display: inline-block;
  font-weight: bold;
`

const ContentType = styled(Paragraph)`
  text-transform: uppercase;
  color: ${themeColor('support', 'valid')};
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
`

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-left: ${themeSpacing(4)};
  border-bottom: 1px solid ${themeColor('tint', 'level3')};
  position: relative;
  min-height: 100%;
`

const StyledLink = styled(Link)`
  margin-bottom: ${themeSpacing(4)};
  width: 100%;

  &:hover,
  &:focus {
    background-color: inherit;

    ${StyledHeading} {
      color: ${themeColor('secondary')};
      text-decoration: underline;
    }

    ${StyledCardContent} {
      border-color: ${themeColor('secondary')};
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledCard = styled(Card)`
  align-items: stretch;
  background-color: inherit;

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledCardMedia = styled(CardMedia)`
  ${({ vertical, imageDimensions }) => `
  flex: 1 0 auto;
    border: 1px solid ${themeColor('tint', 'level3')};
    max-width: ${imageDimensions[0]}px;
    max-height: ${imageDimensions[1]}px;

    &::before {
      padding-top: ${vertical ? '145%' : '100%'};
    }
  `}
`

const IntroText = styled(Paragraph)`
  padding-bottom: ${themeSpacing(4)};
`

const MetaText = styled(Paragraph)`
  display: inline-block;
  color: ${themeColor('tint', 'level5')};
  padding-bottom: ${themeSpacing(4)};
  font-size: 14px;
  line-height: 1.25;
  margin-top: auto;
  &::first-letter {
    text-transform: capitalize;
  }
`

const getImageSize = (image, resize, imageSize) => {
  const small = Math.round(imageSize * 0.5)
  const medium = imageSize

  const srcSet = {
    srcSet: `${getImageFromCms(image, small, small, resize)} ${small}w,
             ${getImageFromCms(image, medium, medium, resize)} ${medium}w`,
  }

  const sizes = {
    sizes: `
      ${ascDefaultTheme.breakpoints.mobileL('max-width')} ${small}px,
      ${ascDefaultTheme.breakpoints.tabletM('max-width')} ${medium}px,
    `,
  }

  return {
    srcSet,
    sizes,
  }
}

const EditorialCard = ({
  id,
  title,
  description = false,
  type,
  specialType = null,
  date = false,
  image,
  linkProps,
  imageDimensions = [400, 400],
  compact = false,
}) => {
  const imageIsVertical = imageDimensions[0] !== imageDimensions[1] // Image dimensions indicate whether the image is square or not

  const { srcSet, sizes } = getImageSize(
    image,
    imageIsVertical ? 'fit' : 'fill',
    imageIsVertical ? imageDimensions[1] : imageDimensions[0],
  )

  const contentType = specialType || type

  return (
    <StyledLink {...linkProps} key={id} title={title} linkType="blank">
      <StyledCard horizontal>
        <StyledCardMedia imageDimensions={imageDimensions} vertical={imageIsVertical}>
          <Image
            {...(image ? { ...srcSet, ...sizes } : {})}
            src={getImageFromCms(image, imageDimensions[0], imageDimensions[1]) || notFoundImage}
            alt={title}
            square
          />
        </StyledCardMedia>
        <StyledCardContent>
          {contentType && (
            <div>
              <ContentType data-test="contentType">{contentType}</ContentType>
            </div>
          )}

          <div>
            <StyledHeading
              forwardedAs={compact ? 'span' : 'h4'}
              compact={compact}
              hasMarginBottom={description}
            >
              {title}
            </StyledHeading>
          </div>

          {description && (
            <div>
              <IntroText>{description}</IntroText>
            </div>
          )}

          {date && (
            <div>
              <MetaText as="time" data-test="metaText" datetime={date}>
                {date}
              </MetaText>
            </div>
          )}
        </StyledCardContent>
      </StyledCard>
    </StyledLink>
  )
}

export default EditorialCard
