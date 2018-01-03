import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions'; // eslint-disable-line import/no-extraneous-dependencies

import MapLegend from './MapLegend';
import layers from '../../services/map-layers';

storiesOf('Map/Legend', module)
  .add('default', () => (
    <MapLegend
      activeMapLayers={layers.filter((layer) => layer.title === 'Kadastrale perceelsgrenzen')}
      onLayerToggle={action('layer toggled')}
      onLayerVisibilityToggle={action('layer visibility toggled')}
      overlays={[{ id: 'bgem', isVisible: true }]}
      zoomLevel={15}
    />
  ));
