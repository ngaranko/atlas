import React from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react'
import Footer from '../Footer'

storiesOf('Dataportaal', module)
  .addDecorator(storyFn => <div style={{ padding: '40px 10px' }}>{storyFn()}</div>)
  .add('Footer', () => <Footer />)
