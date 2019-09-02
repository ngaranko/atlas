import React from 'react'
import styled from '@datapunt/asc-core'
import {
  breakpoint,
  styles,
  Heading,
  ImageCardContent,
  ImageCard,
  Paragraph,
  CompactThemeProvider,
} from '@datapunt/asc-ui'

const ImageCardOuterContainer = styled.div`
  width: 100%;

  @media screen and ${breakpoint('min-width', 'laptop')} {
    margin-top: 12px;
  }
`

const ImageCardInnerContainer = styled.section`
  width: calc(100% + 24px);
  margin-left: -12px;
  margin-right: -12px;
  display: flex;
  flex-wrap: wrap;

  @media screen and ${breakpoint('min-width', 'laptop')} {
    width: calc(100% + 4px);
  }
`

const ImageCardWrapperBig = styled.div`
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

  ${styles.TypographyStyle}.smaller-header {
    @media screen and ${breakpoint('max-width', 'tabletM')} {
      font-size: 14px;
      line-height: 17px;
    }

    @media screen and ${breakpoint('max-width', 'laptop')} {
      font-size: 14px;
      line-height: 20px;
    }
  }
`

const HighlightsBlock = ({ loading }) => (
  <ImageCardOuterContainer>
    <ImageCardInnerContainer>
      <CompactThemeProvider>
        <ImageCardWrapperBig>
          <ImageCard
            margin={12}
            backgroundImage="http://lorempixel.com/output/food-q-c-640-480-3.jpg"
            loading={loading}
          >
            <ImageCardContent>
              <Heading $as="h4" styleAs="h2">
                Jeugdwerkloosheid Amsterdam daalt naar 6,2%
              </Heading>
              <Paragraph gutterBottom={0}>
                Amsterdamse jongeren even vaak werkloos als gemiddeld in Nederland
              </Paragraph>
            </ImageCardContent>
          </ImageCard>
        </ImageCardWrapperBig>
        <ImageCardWrapperSmall>
          <ImageCard
            margin={12}
            backgroundImage="http://lorempixel.com/output/food-q-c-640-480-3.jpg"
            loading={loading}
          >
            <ImageCardContent>
              <Heading $as="h4" strong gutterBottom={0} className="smaller-header">
                Jeugdwerk&shy;loosheid Amsterdam daalt naar 6,2%
              </Heading>
            </ImageCardContent>
          </ImageCard>
          <ImageCard
            margin={12}
            backgroundImage="http://lorempixel.com/output/food-q-c-640-480-3.jpg"
            loading={loading}
          >
            <ImageCardContent>
              <Heading $as="h4" strong gutterBottom={0} className="smaller-header">
                Amsterdammers voelen zich veiliger in het OV
              </Heading>
            </ImageCardContent>
          </ImageCard>
        </ImageCardWrapperSmall>
      </CompactThemeProvider>
    </ImageCardInnerContainer>
  </ImageCardOuterContainer>
)

export default HighlightsBlock
