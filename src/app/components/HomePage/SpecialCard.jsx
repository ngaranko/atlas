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
import { focusOutline } from './services/styles'
import getImageFromCms from '../../utils/getImageFromCms'

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(2)};
  width: 100%;
`

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

  &:focus {
    background: none;
    position: relative;

    ${focusOutline()}
  }
`

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${themeSpacing(2)} 0;
  margin: ${themeSpacing(6)} 0;
  pointer-events: none; /* FF 60 fix */
  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin: ${themeSpacing(6, 2)};
  }
  ${({ showError }) =>
    showError &&
    css`
      background: ${themeColor('tint', 'level4')};
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
  shortTitle,
  title,
  specialType,
  teaser,
  intro,
  teaserImage,
  linkProps,
}) => {
  return (
    <StyledLink {...linkProps} linkType="blank">
      <StyledCard horizontal animateLoading={!showError} isLoading={loading} showError={showError}>
        <StyledCardContent>
          <StyledHeading $as="h4" styleAs="h3">
            {shortTitle || title}
          </StyledHeading>
          <Paragraph>
            {specialType && (
              <StyledTag colorType="tint" colorSubtype="level3">
                {specialType}
              </StyledTag>
            )}
            {teaser || intro}
          </Paragraph>
        </StyledCardContent>
        <StyledCardMedia>
          {teaserImage && (
            <Image src={getImageFromCms(teaserImage, 160, 160)} alt={shortTitle || title} square />
          )}
        </StyledCardMedia>
      </StyledCard>
    </StyledLink>
  )
}

SpecialCard.defaultProps = {
  loading: false,
  showError: false,
  shortTitle: '',
  title: '',
  specialType: '',
  teaser: '',
  intro: '',
  teaserImage: '',
  to: null,
}

SpecialCard.propTypes = {
  loading: PropTypes.bool,
  showError: PropTypes.bool,
  specialType: PropTypes.string,
  title: PropTypes.string,
  shortTitle: PropTypes.string,
  teaser: PropTypes.string,
  intro: PropTypes.string,
  teaserImage: PropTypes.string,
  to: PropTypes.shape({}),
}

export default SpecialCard
