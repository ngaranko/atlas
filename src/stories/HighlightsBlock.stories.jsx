import React from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { Row, Column } from '@datapunt/asc-ui'
import HighlightsBlock from '../components/HighlightsBlock'

storiesOf('Dataportaal/Frontpage', module)
  .addDecorator(withKnobs)
  .add('Highlights', () => (
    <Row debug>
      <Column debug wrap span={{ small: 1, medium: 2, big: 6, large: 8, xLarge: 8 }}>
        <HighlightsBlock loading={boolean('loading', false)} />
      </Column>
    </Row>
  ))
