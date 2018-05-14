import React from 'react';
import { shallow } from 'enzyme';

import MapLeaflet from './MapLeaflet';

import MAP_CONFIG from '../../services/map-config';

describe('MapSearchResults', () => {
  const mapOptions = MAP_CONFIG.MAP_OPTIONS;
  const scaleControlOptions = MAP_CONFIG.SCALE_OPTIONS;

  const getLeafletInstance = () => '';

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
        getLeafletInstance={getLeafletInstance}
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
        getLeafletInstance={getLeafletInstance}
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

  it('should render map with geometry', () => {
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
        getLeafletInstance={getLeafletInstance}
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
      ],
      geojson: {
        geometry: {
          coordinates: [120983, 487047],
          type: 'Point'
        },
        name: 'YE39'
      }
    });
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      layers: [
        {
          id: 'bbn',
          isVisible: true,
          overlayOptions: {
            format: 'image/png',
            identify: false,
            layers: ['bouwblok', 'bouwblok_label']
          },
          transparent: true,
          url: 'https://acc.map.data.amsterdam.nl/maps/gebieden?service=wms'
        }
      ],
      geojson: {
        geometry: {
          coordinates: [
            [
              [
                [[115689.261, 488181.641]],
                [[115697.26, 488181.8]],
                [[115705.37, 488181.959]],
                [[115705.522, 488173.844]],
                [[115705.67, 488165.845]],
                [[115705.819, 488157.847]],
                [[115705.969, 488149.729]],
                [[115697.865, 488149.576]],
                [[115689.866, 488149.424]],
                [[115681.759, 488149.269]],
                [[115681.15, 488181.479]],
                [[115689.261, 488181.641]]
              ]
            ]
          ],
          type: 'MultiPolygon'
        },
        name: 'YE39'
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
