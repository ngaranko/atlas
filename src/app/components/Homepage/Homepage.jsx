import React from 'react'
import styled from '@datapunt/asc-core'
import {
  Row,
  Column,
  Heading,
  CompactThemeProvider,
  breakpoint,
  themeSpacing,
} from '@datapunt/asc-ui'
import HighlightBlock from './HighlightBlock'
import NavigationBlock from './NavigationBlock'
import SpecialsBlock from './SpecialsBlock'
import OrganizationBlock from './OrganizationBlock'
import AboutBlock from './AboutBlock'
import '../../../_styles.scss'
import '../../../../modules/atlas/atlas.scss'
import ShareBar from '../ShareBar/ShareBar'
import ContentContainer from '../ContentContainer/ContentContainer'

const HighlightColumn = styled(Column)`
  // aligns the HighlightsBlock with the NavigationBlock
  margin-top: ${themeSpacing(6)};
`

const StyledRow = styled(Row)`
  margin-bottom: ${themeSpacing(12)};

  @media screen and ${breakpoint('min-width', 'tabletM')} {
    margin-bottom: ${themeSpacing(18)};
  }
`

const Homepage = ({ loading, showError }) => (
  <CompactThemeProvider>
    <ContentContainer>
      <StyledRow valign="flex-start">
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <Heading>Uitgelicht</Heading>
        </Column>
        <HighlightColumn wrap span={{ small: 1, medium: 2, big: 6, large: 8, xLarge: 8 }}>
          <HighlightBlock loading={loading} showError={showError} />
        </HighlightColumn>
        <Column wrap span={{ small: 1, medium: 2, big: 6, large: 4, xLarge: 4 }}>
          <NavigationBlock loading={loading} showError={showError} hasMargin={false} />
        </Column>
      </StyledRow>
      <StyledRow>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <SpecialsBlock loading={loading} showError={showError} />
        </Column>
      </StyledRow>
      <StyledRow>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <OrganizationBlock loading={loading} showError={showError} hasMargin={false} />
        </Column>
      </StyledRow>
      <StyledRow>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <AboutBlock loading={loading} showError={showError} />
        </Column>
      </StyledRow>
      <StyledRow>
        <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
          <ShareBar hasPrintButton={false} />
        </Column>
      </StyledRow>
    </ContentContainer>
  </CompactThemeProvider>
)

export default Homepage
