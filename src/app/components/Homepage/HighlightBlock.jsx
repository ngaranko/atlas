import styled from '@datapunt/asc-core'
import { breakpoint, styles, themeSpacing } from '@datapunt/asc-ui'
import React from 'react'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'
import HighlightCard from './HighlightCard'
import OverviewLink from './OverviewLink'
import highlightsLinks from './services/highlights-links'

const HighlightBlockStyle = styled.div`
  position: relative;
  width: 100%;

  ${({ showError }) => showError && ErrorBackgroundCSS}
`

const HighlightBlockInnerStyle = styled.section`
  display: flex;
  flex-wrap: wrap;
`

const ImageCardWrapperLarge = styled.div`
  flex-basis: 100%;
  margin-bottom: ${themeSpacing(5)};
  line-height: 0;

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    flex-basis: calc(${100 - 100 / 3}% - ${themeSpacing(6)});
    margin-right: ${themeSpacing(6)};
    margin-bottom: 0;
  }
`

const ImageCardWrapperSmall = styled.div`
  justify-content: flex-start;
  display: flex;
  flex-wrap: nowrap;
  flex-basis: calc(${100 / 3}% - ${themeSpacing(6)});
  flex-direction: column;

  // Set a margin-bottom on the last item in ImageCardWrapperSmall
  ${/* sc-selector */ styles.LinkStyle}:first-child {
    margin-bottom: ${themeSpacing(5)};

    @media screen and ${breakpoint('min-width', 'tabletM')} {
      margin-bottom: ${themeSpacing(6)};
    }
  }

  ${styles.ImageCardContentStyle} {
    padding: ${themeSpacing(2, 4)};
  }

  @media screen and ${breakpoint('min-width', 'mobileL')} and ${breakpoint(
  'max-width',
  'tabletM',
)} {
    flex-basis: 100%;
    flex-direction: row;

    ${/* sc-selector */ styles.LinkStyle}:first-child {
      margin-right: ${themeSpacing(5)};
    }
  }

  @media screen and ${breakpoint('max-width', 'mobileL')} {
flex-basis: 100%;
  }
`

const HighlightBlock = ({ loading, showError, ...otherProps }) => (
  <>
    <HighlightBlockStyle {...otherProps} showError={showError}>
      {showError && <ErrorMessage onClick={() => {}} />}
      <HighlightBlockInnerStyle>
        <ImageCardWrapperLarge>
          <HighlightCard
            loading={loading}
            showError={showError}
            {...highlightsLinks[0]}
            styleAs="h2"
            large
          />
        </ImageCardWrapperLarge>
        <ImageCardWrapperSmall>
          {highlightsLinks.slice(1).map(linkProps => (
            <HighlightCard
              loading={loading}
              showError={showError}
              {...linkProps}
              strong
              gutterBottom={0}
            />
          ))}
        </ImageCardWrapperSmall>
      </HighlightBlockInnerStyle>
    </HighlightBlockStyle>
    <OverviewLink href="/" label="Bekijk overzicht" />
  </>
)

export default HighlightBlock
