import styled from '@datapunt/asc-core'
import { breakpoint, Column, Heading, Row, themeColor, themeSpacing } from '@datapunt/asc-ui'
import React from 'react'
import AboutCard from './AboutCard'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'
import aboutDataLinks from './services/about-data-links'
import aboutSiteLinks from './services/about-site-links'

const AboutBlockStyle = styled.div`
  ${({ showError }) => showError && ErrorBackgroundCSS}
  width: 100%;
`

const StyledCardColumn = styled(Column)`
  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: ${themeSpacing(6)};
  }

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    margin-bottom: ${themeSpacing(4)};
  }
`

const StyledRow = styled(Row)`
  height: 100%; // make sure the AboutCards have the same size in both Columns

  @media screen and ${breakpoint('max-width', 'laptop')} {
    margin-bottom: ${themeSpacing(4)};

    @media screen and ${breakpoint('max-width', 'tabletM')} {
      margin-bottom: ${themeSpacing(6)};
    }
  }
`

const StyledColumn = styled(Column)`
  flex-direction: column;
  border-top: 4px solid ${themeColor('tint', 'level3')};
  padding-top: ${themeSpacing(4)};

  // Don't add a margin-bottom rule on the last StyledCardColumn and StyledRow components
  &:last-child {
    ${StyledCardColumn}:last-child {
      margin-bottom: 0;
    }

    @media screen and ${breakpoint('min-width', 'tabletM')} {
      ${StyledCardColumn} {
        margin-bottom: 0;
      }
    }

    ${StyledRow} {
      margin-bottom: 0;
    }
  }
`

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(6)};
`

const AboutBlock = ({ loading, showError, ...otherProps }) => (
  <AboutBlockStyle {...otherProps} showError={showError}>
    {showError && <ErrorMessage onClick={() => {}} />}
    <Row hasMargin={false}>
      <StyledColumn span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}>
        <StyledHeading $as="h2" styleAs="h1">
          Over data
        </StyledHeading>

        <StyledRow hasMargin={false}>
          {aboutDataLinks.map(linkProps => (
            <StyledCardColumn span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
              <AboutCard loading={loading} {...linkProps} />
            </StyledCardColumn>
          ))}
        </StyledRow>
      </StyledColumn>
      <StyledColumn span={{ small: 1, medium: 2, big: 6, large: 6, xLarge: 6 }}>
        <StyledHeading $as="h2" styleAs="h1">
          Over deze site
        </StyledHeading>

        <StyledRow hasMargin={false}>
          {aboutSiteLinks.map(linkProps => (
            <StyledCardColumn span={{ small: 1, medium: 2, big: 3, large: 3, xLarge: 3 }}>
              <AboutCard loading={loading} {...linkProps} />
            </StyledCardColumn>
          ))}
        </StyledRow>
      </StyledColumn>
    </Row>
  </AboutBlockStyle>
)

export default AboutBlock
