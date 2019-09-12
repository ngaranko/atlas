import React from 'react'
import styled from '@datapunt/asc-core'
import { breakpoint, styles, themeColor } from '@datapunt/asc-ui'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'
import { focusImage } from './services/styles'
import highlightsLinks from './services/highlights-links'
import HightlightLinkCard, { HighlightsHeadingStyle } from './HighlightsLinkCard'

const HighlightsBlockStyle = styled.div`
  position: relative;
  width: 100%;

  @media screen and ${breakpoint('min-width', 'laptop')} {
    margin-top: 12px;
  }

  ${({ showError }) => showError && ErrorBackgroundCSS}
`

const HighlightsBlockInnerStyle = styled.section`
  width: calc(100% + 24px);
  margin-left: -12px;
  margin-right: -12px;
  display: flex;
  flex-wrap: wrap;

  @media screen and ${breakpoint('min-width', 'laptop')} {
    width: calc(100% + 4px);
  }

  ${styles.LinkStyle} {
    position: relative;
    width: 100%;
    &:hover {
      ${HighlightsHeadingStyle} {
        color: ${themeColor('secondary')};
        text-decoration: underline;
      }
    }

    &:focus {
      background: none;

      ${/* sc-selector */ styles.ImageCardStyle}::after {
        ${focusImage()}
      }
    }
  }
`

const ImageCardWrapperLarge = styled.div`
  flex-basis: 100%;
  @media screen and ${breakpoint('min-width', 'tabletM')} {
    flex-basis: ${100 - 100 / 3}%;
  }
`

const ImageCardWrapperSmall = styled.div`
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;

  ${styles.ImageCardWrapperStyle} {
    flex-basis: 100%;
    @media screen and ${breakpoint('min-width', 'mobileL')} {
      flex-basis: calc(50% - 24px);
    }
    @media screen and ${breakpoint('min-width', 'tabletM')} {
      flex-basis: 100%;
    }
  }

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    flex-wrap: nowrap;
    flex-basis: ${100 / 3}%;
    flex-direction: column;

    ${styles.ImageCardWrapperStyle} {
      flex-basis: 100%;
    }

    ${styles.ImageCardContentStyle} {
      padding: 8px 16px;
    }
  }
`

const HighlightsBlock = ({ loading, showError, ...otherProps }) => (
  <HighlightsBlockStyle {...otherProps} showError={showError}>
    {showError && <ErrorMessage onClick={() => {}} />}
    <HighlightsBlockInnerStyle>
      <ImageCardWrapperLarge>
        <HightlightLinkCard
          loading={loading}
          showError={showError}
          {...highlightsLinks[0]}
          styleAs="h2"
        />
      </ImageCardWrapperLarge>
      <ImageCardWrapperSmall>
        {highlightsLinks.slice(1).map(linkProps => (
          <HightlightLinkCard
            loading={loading}
            showError={showError}
            {...linkProps}
            strong
            gutterBottom={0}
          />
        ))}
      </ImageCardWrapperSmall>
    </HighlightsBlockInnerStyle>
  </HighlightsBlockStyle>
)

export default HighlightsBlock
