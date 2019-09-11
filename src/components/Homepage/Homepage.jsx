import React from 'react'
import styled from '@datapunt/asc-core'
import {
  breakpoint,
  Link,
  Row,
  Column,
  Heading,
  themeColor,
  CompactThemeProvider,
  Container,
} from '@datapunt/asc-ui'
import HighlightsBlock from './HighlightsBlock'
import NavigationLinksBlock from './NavigationLinksBlock'
import SpecialsBlock from './SpecialsBlock'
import OrganizationBlock from './OrganizationBlock'
import AboutBlock from './AboutBlock'
import FooterComponent from '../../app/components/Footer/Footer'
import Header from '../../app/components/Header'
import '../../_styles.scss'
import '../../../modules/atlas/atlas.scss'
import ShareBar from '../../app/components/ShareBar/ShareBar'
import { blockTopMargin } from './services/styles'

const HomepageStyle = styled(Container)`
  background-color: ${themeColor('tint', 'level1')};

  position: relative;
  @media screen and ${breakpoint('min-width', 'laptopM')} {
    margin: 0 24px;
  }
`

export const Subtitlle = styled(Heading)`
  ${blockTopMargin(24)}
`

export const OverviewLink = styled(Link)`
  margin-top: 32px;
  padding: 8px 3px 8px 0;

  @media screen and ${breakpoint('max-width', 'tabletM')} {
    margin-top: 12px;
  }
`

const StyledShareBar = styled(ShareBar)`
  ${blockTopMargin(24)}
`

const StyledFooter = styled(FooterComponent)`
  margin-top: 72px;
`

/**
 *  Special sticky row for the header to fit in the grid
 */
const StickyRow = styled(Row)`
  position: sticky;
  top: 0;
  z-index: 2;

  @media screen and ${breakpoint('min-width', 'laptopM')} {
    box-shadow: none;
    position: relative;
  }
`

const Homepage = ({ loading, showError }) => (
  <HomepageStyle beamColor="valid">
    <CompactThemeProvider>
      <StickyRow hasMargin={false}>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <Header
            homePage
            hasMaxWidth
            user={{}}
            printMode={false}
            embedPreviewMode={false}
            printOrEmbedMode={false}
            hasPrintButton={false}
            hasEmbedButton={false}
          />
        </Column>
      </StickyRow>
      <Row>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <Subtitlle>Uitgelicht</Subtitlle>
        </Column>
      </Row>
      <Row valign="flex-start">
        <Column wrap span={{ small: 1, medium: 2, big: 6, large: 8, xLarge: 8 }}>
          <HighlightsBlock loading={loading} showError={showError} />
          <OverviewLink linkType="with-chevron" href="/">
            Bekijk overzicht
          </OverviewLink>
        </Column>
        <Column wrap span={{ small: 1, medium: 2, big: 6, large: 4, xLarge: 4 }}>
          <NavigationLinksBlock loading={loading} showError={showError} hasMargin={false} />
        </Column>
      </Row>
      <Row>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <SpecialsBlock loading={loading} showError={showError} />
        </Column>
      </Row>
      <Row>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <OrganizationBlock loading={loading} showError={showError} hasMargin={false} />
        </Column>
      </Row>
      <Row>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <AboutBlock loading={loading} showError={showError} />
        </Column>
      </Row>
      <Row>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <StyledShareBar hasPrintButton={false} />
        </Column>
      </Row>
      <Row hasMargin={false}>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <StyledFooter />
        </Column>
      </Row>
    </CompactThemeProvider>
  </HomepageStyle>
)

export default Homepage
