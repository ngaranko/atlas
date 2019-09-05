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

const HighlightsBlockStyle = styled.div`
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
      ${styles.TypographyStyle}.header {
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

  ${styles.TypographyStyle}.header-small {
    @media screen and ${breakpoint('min-width', 'tabletM')} and ${breakpoint(
  'max-width',
  'laptopM',
)} {
      font-size: 14px;
      line-height: 17px;
    }
  }
`

const HighlightsBlock = ({ loading, ...otherProps }) => (
  <HighlightsBlockStyle {...otherProps}>
    <HighlightsBlockInnerStyle>
      <ImageCardWrapperLarge>
        <Link href="/" linkType="blank">
          <ImageCard
            margin={12}
            backgroundImage="http://lorempixel.com/output/food-q-c-640-480-3.jpg"
            loading={loading}
          >
            <ImageCardContent>
              <Heading $as="h4" styleAs="h2" className="header">
                Jeugdwerkloosheid Amsterdam daalt naar 6,2%
              </Heading>
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
          >
            <ImageCardContent>
              <Heading $as="h4" strong gutterBottom={0} className="header header-small">
                Jeugdwerk&shy;loosheid Amsterdam daalt naar 6,2%
              </Heading>
            </ImageCardContent>
          </ImageCard>
        </Link>
        <Link href="/" linkType="blank">
          <ImageCard
            margin={12}
            backgroundImage="http://lorempixel.com/output/food-q-c-640-480-3.jpg"
            loading={loading}
          >
            <ImageCardContent>
              <Heading $as="h4" strong gutterBottom={0} className="header header-small">
                Amsterdammers voelen zich veiliger in het OV
              </Heading>
            </ImageCardContent>
          </ImageCard>
        </Link>
      </ImageCardWrapperSmall>
    </HighlightsBlockInnerStyle>
  </HighlightsBlockStyle>
)

export default HighlightsBlock
