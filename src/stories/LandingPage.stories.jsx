import React from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import LandingPage from '../components/LandingPage'

storiesOf('Dataportaal', module)
  .addDecorator(storyFn => (
    <div
      style={{
        backgroundColor: 'lightgrey',
        height: '100%',
        position: 'relative',
      }}
    >
      {storyFn()}
    </div>
  ))
  .addDecorator(withKnobs)
  .add('Landing page', () => <LandingPage loading={boolean('loading', false)} />)
