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
  color,
} from '@datapunt/asc-ui'

const CardHeading = styled(Heading)`
  border-bottom: 2px solid transparent;
  line-height: 22px;
  margin-bottom: 12px;
  width: fit-content;
`

const StyledLink = styled(Link)`
  margin-bottom: 16px;
  width: 100%;

  &:hover,
  &:focus {
    ${CardHeading} {
      color: ${color('secondary')};
      border-color: ${color('secondary')};
    }
  }
`

const StyledCard = styled(Card)`
  align-items: stretch;
`

const StyledCardHeading = styled(CardHeading)`
  display: inline-block;
`

const StyledCardMedia = styled(CardMedia)`
  width: 20%;
  flex: 1 0 auto;

  @media screen and ${breakpoint('max-width', 'laptopM')} {
    height: 218px;
    flex: 1 0 218px;
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
  padding: 0;
  margin: 0 16px;
  border-bottom: 1px solid ${color('tint', 'level3')};
  position: relative;
`

const StyledTag = styled(Tag)`
  text-transform: capitalize;
`

const IntroText = styled(Paragraph)`
  padding-bottom: 16px;
`

const MetaText = styled(Paragraph)`
  color: grey;
  padding-bottom: 16px;
  font-size: 14px;
  line-height: 1.25;
`

const EditorialCard = ({ dataItem, href }) => (
  <StyledLink key={dataItem.id} href={href} linkType="blank">
    <StyledCard horizontal>
      <StyledCardMedia>
        <Image
          src={
            dataItem.teaserImageUrl
              ? dataItem.teaserImageUrl
              : '../assets/images/not_found_thumbnail.jpg'
          }
          alt={dataItem.title}
          square
        />
      </StyledCardMedia>
      <StyledCardContent>
        <StyledCardHeading $as="h4">
          {dataItem.field_short_title || dataItem.title}
        </StyledCardHeading>
        <IntroText>{dataItem.field_teaser || dataItem.field_intro}</IntroText>
        {dataItem.field_special_type ? (
          <StyledTag>{dataItem.field_special_type}</StyledTag>
        ) : (
          <MetaText>{dataItem.localeDate}</MetaText>
        )}
      </StyledCardContent>
    </StyledCard>
  </StyledLink>
)

export default EditorialCard
