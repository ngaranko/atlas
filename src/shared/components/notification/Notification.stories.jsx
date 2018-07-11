import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import Notification from './Notification';

storiesOf('Shared/Notification', module)
  .add('with text', () => (
    <Notification>Lorem ipsum dolor sit amet</Notification>
  ))
  .add('with link', () => (
    <Notification><a href="/lorem/ipsum">Lorem ipsum</a> dolor sit amet</Notification>
  ))
  .add('with explicit `message` level', () => (
    <Notification level="message">Lorem ipsum dolor sit amet</Notification>
  ))
  .add('with info level', () => (
    <Notification level="info">Lorem ipsum dolor sit amet</Notification>
  ))
  .add('with alert level', () => (
    <Notification level="alert">Lorem ipsum dolor sit amet</Notification>
  ))
  .add('without close button', () => (
    <Notification
      level="info"
      canClose={false}
    >Lorem ipsum dolor sit amet</Notification>
  ));
