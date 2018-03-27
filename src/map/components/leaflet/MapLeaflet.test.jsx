import React from 'react';
import { shallow } from 'enzyme';

import MapLeaflet from './MapLeaflet';

import MAP_CONFIG from '../../services/map-config';

describe('MapSearchResults', () => {
  const mapOptions = MAP_CONFIG.MAP_OPTIONS;
  const scaleControlOptions = MAP_CONFIG.SCALE_OPTIONS;

  const baseLayer = {
    baseLayerOptions: {
      bounds: [[52.25168, 4.64034], [52.50536, 5.10737]],
      maxZoom: 16,
      minZoom: 8,
      subdomains: ['acc.t1', 'acc.t2', 'acc.t3', 'acc.t4'],
      tms: true
    },
    urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png'
  };

  it('should render map with base layer and update base layer if props change', () => {
    const center = [52.3731081, 4.8932945];
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapLeaflet
        mapOptions={mapOptions}
        scaleControlOptions={scaleControlOptions}
        center={center}
        baseLayer={baseLayer}
        onZoomEnd={clickHandler}
        onDragEnd={clickHandler}
      />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      baseLayer: {
        ...baseLayer,
        urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2017_RD/{z}/{x}/{y}.jpeg'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });


  it('should render map with without layers and add/remove layers if props change', () => {
    const center = [52.3731081, 4.8932945];
    const clickHandler = jest.fn();
    const layers = [];
    const wrapper = shallow(
      <MapLeaflet
        mapOptions={mapOptions}
        scaleControlOptions={scaleControlOptions}
        center={center}
        layers={layers}
        baseLayer={baseLayer}
        onZoomEnd={clickHandler}
        onDragEnd={clickHandler}
      />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      layers: [
        {
          id: 'biz',
          isVisible: true,
          overlayOptions: {
            format: 'image/png',
            identify: false,
            layers: ['biz_polygons']
          },
          transparent: true,
          url: 'https://acc.map.data.amsterdam.nl/maps/biz'
        }
      ]
    });
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      layers: []
    });
    expect(wrapper).toMatchSnapshot();
  });
});
