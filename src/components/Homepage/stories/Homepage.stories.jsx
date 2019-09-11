import React from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import Homepage from '../Homepage'

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
  .add('Homepage', () => (
    <Homepage showError={boolean('error', false)} loading={boolean('loading', false)} />
  ))
