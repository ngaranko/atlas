import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import SelectButton from './SelectButton';
import AerialIcon from '../../../../public/images/icon-aerial.svg';

storiesOf('Shared/SelectButton', module)
  .add('active', () => (
    <SelectButton
      icon={AerialIcon}
      options={[
        {
          label: 'Option 1',
          value: 1
        },
        {
          label: 'Option 2',
          value: 2
        }
      ]}
    >
      Lorem ipsum dolor sit amet
    </SelectButton>
  ))
  .add('disabled', () => (
    <SelectButton
      icon={AerialIcon}
      isDisabled
      options={[
        {
          label: 'Option 1',
          value: 1
        },
        {
          label: 'Option 2',
          value: 2
        }
      ]}
    >
      Lorem ipsum dolor sit amet
    </SelectButton>
  ))
  .add('expanded', () => (
    <SelectButton
      icon={AerialIcon}
      isExpanded
      options={[
        {
          label: 'Option 1',
          value: 1
        },
        {
          label: 'Option 2',
          value: 2
        }
      ]}
    >
      Lorem ipsum dolor sit amet
    </SelectButton>
  ));
