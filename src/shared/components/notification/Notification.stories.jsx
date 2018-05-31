import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import Notification from './Notification';

storiesOf('Shared/Notification', module)
  .add('with text', () => (
    <Notification>Lorem ipsum dolor sit amet</Notification>
  ))
  .add('with link', () => (
    <Notification><a href="">Lorem ipsum</a> dolor sit amet</Notification>
  ));
