import { ChevronRight } from '@datapunt/asc-assets'
import styled from '@datapunt/asc-core'
import {
  breakpoint,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Heading,
  Icon,
  Link,
  Paragraph,
  styles,
  svgFill,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import PropTypes from 'prop-types'
import React from 'react'
import RouterLink from 'redux-first-router-link'
import focusOutline from '../shared/focusOutline'

const StyledHeading = styled(Heading)`
  margin-bottom: 0;
`

const StyledIcon = styled(Icon)`
  @media screen and ${breakpoint('max-width', 'mobileL')} {
    max-width: 36px;
  }
`

const StyledCard = styled(Card)`
  width: 100%;
  margin-bottom: 0;
  height: ${themeSpacing(18)};
  pointer-events: none; /* FF 60 fix */
`

const StyledLink = styled(Link)`
  position: relative;
  width: 100%;
  break-inside: avoid;
  display: flex;
  margin-bottom: ${themeSpacing(2)};

  &:hover {
    ${StyledHeading} {
      color: ${themeColor('secondary')};
      text-decoration: underline;}

    ${styles.IconStyle} {
      ${svgFill('secondary')};
    }
  }

  &:focus {
    background: none;
    ${StyledCard} {
      ${focusOutline()}
    }

  }

  &:last-child {
    margin-bottom: 0;
  }
}
`

const StyledCardMedia = styled(CardMedia)`
  flex-basis: ${themeSpacing(18)};
  min-width: ${themeSpacing(18)};
`

const StyledCardContent = styled(CardContent)`
  min-height: inherit;
  align-self: flex-start;
  padding: ${themeSpacing(2)};
`

const StyledCardActions = styled(CardActions)`
  width: auto;
  padding-left: 0 !important;
`

const StyledParagraph = styled(Paragraph)`
  // Hard overwrite specifically for this component
  font-size: 14px;
  line-height: 17px;
  height: 34px; // two times the line-height
  width: 100%;
  overflow: hidden; // make sure the text doesn't falls outside this Paragraph
`

const NavigationCard = ({ CardIcon, to, title, description }) => (
  <StyledLink forwardedAs={RouterLink} linkType="blank" to={to}>
    <StyledCard horizontal>
      <StyledCardMedia backgroundColor="level2">
        <CardIcon />
      </StyledCardMedia>
      <StyledCardContent>
        <StyledHeading forwardedAs="h4">{title}</StyledHeading>
        <StyledParagraph>{description}</StyledParagraph>
      </StyledCardContent>
      <StyledCardActions>
        <StyledIcon size={15}>
          <ChevronRight />
        </StyledIcon>
      </StyledCardActions>
    </StyledCard>
  </StyledLink>
)

NavigationCard.propTypes = {
  CardIcon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.shape({}).isRequired,
}

export default NavigationCard
