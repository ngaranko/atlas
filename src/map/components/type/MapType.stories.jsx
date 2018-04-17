import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions'; // eslint-disable-line import/no-extraneous-dependencies

import MapType from './MapType';
import baseLayers from '../../services/map-base-layers/map-base-layers';

storiesOf('Map/MapType', module)
  .add('default', () => (
    <MapType
      activeBaseLayer={'hoi'}
      baseLayers={baseLayers}
      onBaseLayerToggle={action('base layer toggled')}
    />
  ));
