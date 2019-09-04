import React from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import OrganizationBlock from '../components/OrganizationBlock'

storiesOf('Dataportaal/Frontpage', module)
  .addDecorator(storyFn => <div style={{ padding: '40px 0' }}>{storyFn()}</div>)
  .addDecorator(withKnobs)
  .add('Presentation', () => <OrganizationBlock loading={boolean('loading', false)} />)
