import React from 'react'
import styled from '@datapunt/asc-core'
import { Heading, Row, Column, CardContainer, styles, color, breakpoint } from '@datapunt/asc-ui'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'
import { blockTopMargin } from './services/styles'
import aboutDataLinks from './services/about-data-links'
import aboutSiteLinks from './services/about-site-links'
import AboutLinkCard from './AboutLinkCard'

/* istanbul ignore next */ const StyledAboutCard = styled(CardContainer)`
  ${({ showError }) => showError && ErrorBackgroundCSS}
  ${blockTopMargin()}

  ${styles.ColumnStyle} {
    margin-bottom: 16px;

    &.column-with-heading {
      margin-top: 16px;
      flex-direction: column;

      &:first-of-type {
        margin-top: 0;
      }
    }
  }

  ${styles.LinkStyle} {
    width: 100%;
    height: 100%;

    &:focus ${styles.CardStyle} {
      background: none;
    }
  }

  ${styles.CardStyle} {
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:hover {
      ${({ theme }) => `box-shadow: 2px 2px ${color('secondary')({ theme })};`}

      ${styles.HeadingStyle} {
        color: ${color('secondary')};
        text-decoration: underline;
      }
    }
  }

  ${styles.CardContentStyle} {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    ${styles.ColumnStyle} {
      &.column-with-heading {
        margin-top: 0;
      }
    }
  }
`

/* istanbul ignore next */ const Border = styled.div`
  height: 4px;
  margin-bottom: 16px;
  background-color: ${color('tint', 'level3')};
`

/* istanbul ignore next */ const AboutBlock = ({ loading, showError, ...otherProps }) => (
  <StyledAboutCard {...otherProps} showError={showError}>
    {showError && <ErrorMessage onClick={() => {}} />}
    <Row hasMargin={false}>
      <Column wrap span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}>
        <Column
          className="column-with-heading"
          span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}
          // order={{ small: 1, medium: 1, big: 1, large: 1, xLarge: 1 }}
        >
          <Border />
          <Heading $as="h2" styleAs="h1">
            Over data
          </Heading>
        </Column>

        {aboutDataLinks.map(linkProps => (
          <Column
            span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}
            // order={{ small: 2, medium: 2, big: 2, large: 3, xLarge: 3 }}
          >
            <AboutLinkCard loading={loading} {...linkProps} />
          </Column>
        ))}
      </Column>
      <Column wrap span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}>
        <Column
          className="column-with-heading"
          span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}
          // order={{ small: 4, medium: 4, big: 4, large: 4, xLarge: 4 }}
        >
          <Border />
          <Heading $as="h2" styleAs="h1">
            Over deze site
          </Heading>
        </Column>

        {aboutSiteLinks.map(linkProps => (
          <Column
            span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}
            // order={{ small: 2, medium: 2, big: 2, large: 3, xLarge: 3 }}
          >
            <AboutLinkCard loading={loading} {...linkProps} />
          </Column>
        ))}
      </Column>
    </Row>
  </StyledAboutCard>
)

export default AboutBlock
