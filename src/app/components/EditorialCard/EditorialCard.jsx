import React from 'react'
import styled from '@datapunt/asc-core'
import {
  Card,
  CardContent,
  CardMedia,
  Link,
  Heading,
  Paragraph,
  Image,
  Tag,
  breakpoint,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import RouterLink from 'redux-first-router-link'

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

const MEDIA_IMAGE_DEFAULT_DIMENSION = 160

const StyledCard = styled(Card)`
  align-items: stretch;
`

const StyledCardHeading = styled(CardHeading)`
  display: inline-block;
`

const StyledCardMedia = styled(CardMedia)`
  width: 20%;
  max-width: ${({ vertical }) => (vertical ? '110px' : `${MEDIA_IMAGE_DEFAULT_DIMENSION}px`)};
  height: ${MEDIA_IMAGE_DEFAULT_DIMENSION}px;
  flex: 1 0 auto;
  border: 1px solid ${themeColor('tint', 'level3')};

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    flex: 1 0 160px;
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    height: 72px;
    flex: 1 0 72px;
  }

  @media screen and ${breakpoint('max-width', 'mobileM')} {
    height: 56px;
    flex: 1 0 56px;
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
  text-transform: capitalize;
  margin-top: auto;
`

const EditorialCard = ({
  id,
  title,
  shortTitle,
  teaser,
  intro,
  specialType,
  localeDate,
  localeDateFormatted,
  image,
  imageIsVertical,
  to,
}) => (
  <StyledLinkWrapper key={id} to={to} linkType="blank">
    <StyledCard horizontal>
      <StyledCardMedia vertical={imageIsVertical}>
        <Image src={image || notFoundImage} alt={title} square />
      </StyledCardMedia>
      <StyledCardContent>
        <StyledCardHeading $as="h4">{shortTitle || title}</StyledCardHeading>
        {specialType && (
          <StyledTag colorType="tint" colorSubtype="level3">
            {specialType}
          </StyledTag>
        )}
        <IntroText>{teaser || intro}</IntroText>
        {localeDate && (
          <MetaText as="time" datetime={localeDate}>
            {localeDateFormatted}
          </MetaText>
        )}
      </StyledCardContent>
    </StyledCard>
  </StyledLinkWrapper>
)

export default EditorialCard
