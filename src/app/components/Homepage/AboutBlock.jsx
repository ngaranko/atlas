import React from 'react'
import styled from '@datapunt/asc-core'
import { Heading, Row, Column, CardContainer, styles, color } from '@datapunt/asc-ui'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'
import aboutDataLinks from './services/about-data-links'
import aboutSiteLinks from './services/about-site-links'
import AboutLinkCard from './AboutLinkCard'

/* istanbul ignore next */ const StyledAboutCard = styled(CardContainer)`
  ${({ showError }) => showError && ErrorBackgroundCSS}

  ${styles.ColumnStyle} {
    margin-bottom: 16px;
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
`

const HeaderColumn = styled(Column)`
  flex-direction: column;
  border-top: 4px solid ${color('tint', 'level3')};
  padding-top: 16px;
`

/* istanbul ignore next */ const AboutBlock = ({ loading, showError, ...otherProps }) => (
  <StyledAboutCard {...otherProps} showError={showError}>
    {showError && <ErrorMessage onClick={() => {}} />}
    <Row hasMargin={false}>
      <Column wrap span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}>
        <HeaderColumn span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <Heading $as="h2" styleAs="h1">
            Over data
          </Heading>
        </HeaderColumn>

        {aboutDataLinks.map(linkProps => (
          <Column span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
            <AboutLinkCard loading={loading} {...linkProps} />
          </Column>
        ))}
      </Column>
      <Column wrap span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}>
        <HeaderColumn span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}>
          <Heading $as="h2" styleAs="h1">
            Over deze site
          </Heading>
        </HeaderColumn>

        {aboutSiteLinks.map(linkProps => (
          <Column span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
            <AboutLinkCard loading={loading} {...linkProps} />
          </Column>
        ))}
      </Column>
    </Row>
  </StyledAboutCard>
)

export default AboutBlock
