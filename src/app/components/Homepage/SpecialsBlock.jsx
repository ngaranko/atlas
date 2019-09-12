import React from 'react'
import styled, { css } from '@datapunt/asc-core'
import {
  CardContainer,
  Heading,
  Row,
  Column,
  Link,
  themeColor,
  breakpoint,
  styles,
} from '@datapunt/asc-ui'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'
import { blockTopMargin } from './services/styles'
import specialsLinks from './services/specials-links'
import SpecialsLinkCard from './SpecialsLinkCard'

const addBorderTop = () =>
  css`
    border-top: ${themeColor('tint', 'level3')} 1px solid;
  `
const StyledSpecialsBlock = styled(CardContainer)`
  ${blockTopMargin()}
`
const StyledContentRow = styled(Row)`
  ${({ showError }) => showError && ErrorBackgroundCSS}

  ${/* sc-selector */ styles.ColumnStyle}:first-child > ${styles.LinkStyle} {
    ${addBorderTop()}
  }

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    ${/* sc-selector */ styles.ColumnStyle}:nth-child(2) > ${styles.LinkStyle} {
      ${addBorderTop()}
    }
  }

  @media screen and ${breakpoint('min-width', 'laptop')} {
    ${/* sc-selector */ styles.ColumnStyle}:nth-child(3) > ${styles.LinkStyle} {
      ${addBorderTop()}
    }
  }

  ${/* sc-selector */ styles.ColumnStyle} > ${styles.LinkStyle} {
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
  }

  ${styles.CardStyle} {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 8px 0;
    margin: 24px 0;
    @media screen and ${breakpoint('min-width', 'tabletM')} {
      margin: 24px 8px;
    }
    ${({ showError }) =>
      !showError &&
      css`
        background: none;
      `}
  }

  ${styles.CardContentStyle} {
     padding: 0;
     margin-right: 16px;
  }

  ${styles.CardMediaWrapperStyle} {
    max-width: 80px;
    align-self: flex-start;
  }

  ${styles.TagStyle} {
    display: inline;
    margin-right: 5px;
    background-color: ${themeColor('tint', 'level3')};
    color: ${themeColor('tint', 'level7')};
    padding: 2px;
  }
`

const OverviewLink = styled(Link)`
  margin-top: 24px;
  padding: 8px 3px 8px 0;
`

const CardSpecialsSubtiltle = styled(Heading)`
  @media screen and ${breakpoint('max-width', 'laptopL')} {
    margin-bottom: 16px;
  }

  @media screen and ${breakpoint('min-width', 'laptopL')} {
    margin-bottom: 24px;
  }
`

const SpecialsBlock = ({ loading, showError, ...otherProps }) => (
  <StyledSpecialsBlock {...otherProps}>
    <Row hasMargin={false}>
      <Column wrap span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
        <CardSpecialsSubtiltle $as="h1">In Beeld</CardSpecialsSubtiltle>
      </Column>
    </Row>
    <StyledContentRow hasMargin={false} showError={showError}>
      {showError && <ErrorMessage onClick={() => {}} />}
      {specialsLinks.map(linkProps => (
        <Column wrap span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }}>
          <SpecialsLinkCard loading={loading} showError={showError} {...linkProps} />
        </Column>
      ))}
    </StyledContentRow>
    <Row hasMargin={false}>
      <Column wrap span={{ small: 1, medium: 2, big: 3, large: 4, xLarge: 4 }}>
        <OverviewLink linkType="with-chevron" href="/">
          Bekijk overzicht
        </OverviewLink>
      </Column>
    </Row>
  </StyledSpecialsBlock>
)

export default SpecialsBlock
