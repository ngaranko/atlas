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
  Tag,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import RouterLink from 'redux-first-router-link'
import getImageFromCms from '../../utils/getImageFromCms'
import { EDITORIAL_DETAIL_ACTIONS } from '../../pages/EditorialOverviewPage/constants'
import { TYPES } from '../../../shared/config/cms.config'

const notFoundImage = require('./not_found_thumbnail.jpg')

const IMAGE_SIZE = 160

const StyledHeading = styled(Heading)`
  border-bottom: 2px solid transparent;
  line-height: 22px;
  margin-bottom: ${themeSpacing(3)};
  width: fit-content;
  display: inline-block;
`

const StyledLink = styled(Link)`
  margin-bottom: ${themeSpacing(4)};
  width: 100%;

  &:hover,
  &:focus {
    background-color: inherit;

    ${StyledHeading} {
      color: ${themeColor('secondary')};
      border-color: ${themeColor('secondary')};
    }
  }
`

const StyledCard = styled(Card)`
  align-items: stretch;
`

const StyledCardMedia = styled(CardMedia)`
  flex: 1 0 auto;
  border: 1px solid ${themeColor('tint', 'level3')};
  max-width: ${({ vertical }) => (vertical ? IMAGE_SIZE * 0.7 : IMAGE_SIZE)}px;
  max-height: ${IMAGE_SIZE}px;

  &::before {
    padding-top: ${({ vertical }) => (vertical ? '145%' : '100%')};
  }
`

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: ${themeSpacing(0, 4)};
  border-bottom: 1px solid ${themeColor('tint', 'level3')};
  position: relative;
`

const StyledTag = styled(Tag)`
  display: inline-block;
  text-transform: capitalize;
  margin-bottom: ${themeSpacing(2)};
  padding: 2px; // needs to check if we need to implement this in asc-ui, as we also use the same padding on the homepage
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

const getImageSize = (image, resize) => {
  const srcSet = {
    srcSet: `${getImageFromCms(image, IMAGE_SIZE * 0.5, IMAGE_SIZE * 0.5, resize)} ${IMAGE_SIZE *
      0.5}w,
             ${getImageFromCms(image, IMAGE_SIZE, IMAGE_SIZE, resize)} ${IMAGE_SIZE}w`,
  }
  const sizes = {
    sizes: `
    (max-width: ${ascDefaultTheme.breakpoints.mobileL}px) ${IMAGE_SIZE * 0.5}px,
    (max-width: ${ascDefaultTheme.breakpoints.tabletM}px) ${IMAGE_SIZE}px,
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
  label, // GraphQL
  shortTitle,
  teaser,
  intro,
  specialType,
  localeDate,
  localeDateFormatted,
  date, // GraphQL
  dateLocale, // GraphQL
  slug, // GraphQL
  teaserImage,
  coverImage,
  to: toProp,
  type,
}) => {
  const image = type === TYPES.PUBLICATION ? coverImage : teaserImage
  const imageIsVertical = type === TYPES.PUBLICATION

  const { srcSet, sizes } = getImageSize(image, type === TYPES.PUBLICATION ? 'fit' : 'fill')

  // The type SPECIALS has a different url structure
  const to =
    toProp ||
    (specialType
      ? EDITORIAL_DETAIL_ACTIONS[type](id, specialType, slug)
      : EDITORIAL_DETAIL_ACTIONS[type](id, slug))

  const displayTitle = shortTitle || title || label

  return (
    <StyledLink $as={RouterLink} key={id} to={to} title={displayTitle} linkType="blank">
      <StyledCard horizontal>
        <StyledCardMedia vertical={imageIsVertical}>
          <Image
            {...(image ? { ...srcSet, ...sizes } : {})}
            src={getImageFromCms(image, 400, 400) || notFoundImage}
            alt={title}
            square
          />
        </StyledCardMedia>
        <StyledCardContent>
          <div>
            <StyledHeading $as="h4">{displayTitle}</StyledHeading>
          </div>

          {specialType && (
            <div>
              <StyledTag colorType="tint" colorSubtype="level3">
                {specialType}
              </StyledTag>
            </div>
          )}

          <div>
            <IntroText>{teaser || intro}</IntroText>
          </div>

          {!specialType && (localeDate || date || dateLocale) && (
            <div>
              <MetaText as="time" data-test="metaText" datetime={localeDate || date}>
                {localeDateFormatted || dateLocale}
              </MetaText>
            </div>
          )}
        </StyledCardContent>
      </StyledCard>
    </StyledLink>
  )
}

export default EditorialCard
