import React from 'react'
import styled from '@datapunt/asc-core'
import {
  breakpoint,
  styles,
  Heading,
  ImageCardContent,
  ImageCard,
  Link,
  themeColor,
} from '@datapunt/asc-ui'
import ErrorMessage, { ErrorBackgroundCSS } from './ErrorMessage'

const StyledHeading = styled(Heading)`
  @media screen and ${breakpoint('max-width', 'tabletM')} {
    font-size: 16px;
    line-height: 20px;
  }

  @media screen and ${breakpoint('min-width', 'tabletM')} and ${breakpoint(
  'max-width',
  'laptopM',
)} {
      font-size: 14px;
      line-height: 17px;
    }
`

const HighlightsHeading = ({ children, ...otherProps }) => (
  <StyledHeading $as="h4" {...otherProps}>
    {children}
  </StyledHeading>
)

const HighlightsBlockStyle = styled.div`
  position: relative;
  width: 100%;

  @media screen and ${breakpoint('min-width', 'laptop')} {
    margin-top: 12px;
  }

  ${styles.TypographyStyle}.header {
    @media screen and ${breakpoint('max-width', 'tabletM')} {
      font-size: 16px;
      line-height: 20px;
    }
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
      ${StyledHeading} {
        color: ${themeColor('secondary')};
        text-decoration: underline;
      }
    }

    &:focus {
      background: none;

      ${/* sc-selector */ styles.ImageCardStyle}::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        ${({ theme }) => `border: 4px solid ${themeColor('support', 'focus')({ theme })};`}
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
        <Link href="/" linkType="blank">
          <ImageCard
            margin={12}
            backgroundImage="http://lorempixel.com/output/food-q-c-640-480-3.jpg"
            loading={loading}
            animateLoading={!showError}
          >
            <ImageCardContent>
              <HighlightsHeading styleAs="h2" className="header">
                Jeugdwerkloosheid Amsterdam daalt naar 6,2%
              </HighlightsHeading>
            </ImageCardContent>
          </ImageCard>
        </Link>
      </ImageCardWrapperLarge>
      <ImageCardWrapperSmall>
        <Link href="/" linkType="blank">
          <ImageCard
            margin={12}
            backgroundImage="http://lorempixel.com/output/food-q-c-640-480-3.jpg"
            loading={loading}
            animateLoading={!showError}
          >
            <ImageCardContent>
              <HighlightsHeading strong gutterBottom={0} small>
                Jeugdwerk&shy;loosheid Amsterdam daalt naar 6,2%
              </HighlightsHeading>
            </ImageCardContent>
          </ImageCard>
        </Link>
        <Link href="/" linkType="blank">
          <ImageCard
            margin={12}
            backgroundImage="http://lorempixel.com/output/food-q-c-640-480-3.jpg"
            loading={loading}
            animateLoading={!showError}
          >
            <ImageCardContent>
              <HighlightsHeading strong gutterBottom={0}>
                Amsterdammers voelen zich veiliger in het OV
              </HighlightsHeading>
            </ImageCardContent>
          </ImageCard>
        </Link>
      </ImageCardWrapperSmall>
    </HighlightsBlockInnerStyle>
  </HighlightsBlockStyle>
)

export default HighlightsBlock
