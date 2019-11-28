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

const CardHeading = styled(Heading)`
  border-bottom: 2px solid transparent;
  line-height: 22px;
  margin-bottom: ${themeSpacing(3)};
  width: fit-content;
`

const StyledRouterLink = styled(RouterLink)`
  margin-bottom: ${themeSpacing(4)};
  width: 100%;

  &:hover,
  &:focus {
    background-color: inherit;

    ${CardHeading} {
      color: ${themeColor('secondary')};
      border-color: ${themeColor('secondary')};
    }
  }
`

const StyledLinkWrapper = ({ children, ...otherProps }) => (
  <Link $as={StyledRouterLink} {...otherProps}>
    {children}
  </Link>
)

const StyledCard = styled(Card)`
  align-items: stretch;
`

const StyledCardHeading = styled(CardHeading)`
  display: inline-block;
`

const StyledCardMedia = styled(CardMedia)`
  flex: 1 0 auto;
  border: 1px solid ${themeColor('tint', 'level3')};
  height: 0%; // fix to reset the height given by the parent's display: flex;
  min-width: ${themeSpacing(12)};
  max-width: ${themeSpacing(40)};
  width: 20%;

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
  const resize = type === TYPES.PUBLICATION ? 'fit' : 'fill'

  const srcSet = {
    srcSet: `${getImageFromCms(image, 100, 100, resize)} 70w,
             ${getImageFromCms(image, 200, 100, resize)} 200w,
             ${getImageFromCms(image, 400, 400, resize)} 400w`,
  }
  const sizes = {
    sizes: `
    (max-width: ${ascDefaultTheme.breakpoints.mobileL}px) 70px,
    (max-width: ${ascDefaultTheme.breakpoints.tabletM}px) 200px,
    400px
    `,
  }

  // The type SPECIALS has a different url structure
  const to =
    toProp ||
    (specialType
      ? EDITORIAL_DETAIL_ACTIONS[type](id, specialType, slug)
      : EDITORIAL_DETAIL_ACTIONS[type](id, slug))

  return (
    <StyledLinkWrapper key={id} to={to} title={title} linkType="blank">
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
            <StyledCardHeading $as="h4">{shortTitle || title || label}</StyledCardHeading>
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
    </StyledLinkWrapper>
  )
}

export default EditorialCard
