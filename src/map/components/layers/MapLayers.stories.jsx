import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions'; // eslint-disable-line import/no-extraneous-dependencies

import MapLayers from './MapLayers';
import layers from '../../services/map-layers';

storiesOf('Map/MapLayers', module)
  .add('authenticated', () => (
    <MapLayers
      activeMapLayers={[]}
      layers={layers.slice(0, 20)}
      onLayerToggle={action('toggled')}
      user={{ authenticated: true, scopes: ['HR/R'] }}
    />
  ))
  .add('unauthenticated', () => (
    <MapLayers
      activeMapLayers={[]}
      layers={layers.slice(0, 20)}
      onLayerToggle={action('toggled')}
      user={{ authenticated: false, scopes: [] }}
    />
  ))
  .add('active layer', () => (
    <MapLayers
      activeMapLayers={[{ title: 'Kadastrale perceelsgrenzen' }]}
      layers={layers.slice(0, 20)}
      onLayerToggle={action('toggled')}
      user={{ authenticated: false, scopes: [] }}
    />
  ));
