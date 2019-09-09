import React from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { Column, CompactThemeProvider, Row } from '@datapunt/asc-ui'
import {
  LandingPageStyle,
  OverviewLink,
  StickyRow,
  StyledColumn,
  StyledFooter,
  StyledShareBar,
  Subtiltle,
} from '../components/LandingPage'
import Header from '../app/components/Header/HeaderContainer'
import HighlightsBlock from '../components/HighlightsBlock'
import NavigationLinksBlock from '../components/NavigationLinksBlock'
import SpecialsBlock from '../components/SpecialsBlock'
import OrganizationBlock from '../components/OrganizationBlock'
import AboutBlock from '../components/AboutBlock'

storiesOf('Dataportaal', module)
  .addDecorator(storyFn => (
    <div
      style={{
        backgroundColor: '#E6E6E6',
        height: '100%',
        position: 'relative',
      }}
    >
      {storyFn()}
    </div>
  ))
  .addDecorator(withKnobs)
  .add('Landing page', () => (
    <LandingPageStyle>
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
            <Subtiltle>Uitgelicht</Subtiltle>
          </Column>
        </Row>
        <Row>
          <Column wrap span={{ small: 1, medium: 2, big: 6, large: 8, xLarge: 8 }}>
            <HighlightsBlock
              showError={boolean('error', false)}
              loading={boolean('loading', false)}
            />
          </Column>
          <Column
            span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}
            order={{ large: 3, xLarge: 3 }}
          >
            <OverviewLink linkType="with-chevron" href="/">
              Bekijk overzicht
            </OverviewLink>
          </Column>
          <StyledColumn wrap span={{ small: 1, medium: 2, big: 6, large: 4, xLarge: 4 }}>
            <NavigationLinksBlock
              showError={boolean('error', false)}
              loading={boolean('loading', false)}
            />
          </StyledColumn>
        </Row>
        <Row>
          <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
            <SpecialsBlock
              showError={boolean('error', false)}
              loading={boolean('loading', false)}
              className="block"
            />
          </Column>
        </Row>
        <Row>
          <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
            <OrganizationBlock
              showError={boolean('error', false)}
              loading={boolean('loading', false)}
              className="block"
            />
          </Column>
        </Row>
        <Row>
          <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
            <AboutBlock
              showError={boolean('error', false)}
              loading={boolean('loading', false)}
              className="block"
            />
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
    </LandingPageStyle>
  ))
