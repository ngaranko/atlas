import React from 'react';
import { shallow } from 'enzyme';

import MapLeaflet from './MapLeaflet';

import MAP_CONFIG from '../../services/map-config';

describe('MapLeaflet component', () => {
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
        baseLayer={baseLayer}
        center={center}
        getLeafletInstance={getLeafletInstance}
        mapOptions={mapOptions}
        onMoveEnd={clickHandler}
        onZoomEnd={clickHandler}
        scaleControlOptions={scaleControlOptions}
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
        baseLayer={baseLayer}
        center={center}
        getLeafletInstance={getLeafletInstance}
        layers={layers}
        mapOptions={mapOptions}
        onMoveEnd={clickHandler}
        onZoomEnd={clickHandler}
        scaleControlOptions={scaleControlOptions}
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

  it('should render map with geoJSON with RD coordinates', () => {
    const center = [52.3731081, 4.8932945];
    const clickHandler = jest.fn();
    const layers = [];
    const wrapper = shallow(
      <MapLeaflet
        baseLayer={baseLayer}
        center={center}
        getLeafletInstance={getLeafletInstance}
        layers={layers}
        mapOptions={mapOptions}
        onMoveEnd={clickHandler}
        onZoomEnd={clickHandler}
        scaleControlOptions={scaleControlOptions}
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
      rdGeoJsons: [
        {},
        {
          geoJson: {
            coordinates: [120983, 487047],
            type: 'Point'
          },
          id: 'YE39'
        }
      ]
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
      rdGeoJsons: [
        {
          geoJson: {
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
          id: 'YE39'
        }
      ]
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render map with coordinates in lat/lon', () => {
    const center = [52.3731081, 4.8932945];
    const clickHandler = jest.fn();
    const layers = [];
    const wrapper = shallow(
      <MapLeaflet
        baseLayer={baseLayer}
        center={center}
        getLeafletInstance={getLeafletInstance}
        layers={layers}
        mapOptions={mapOptions}
        onMoveEnd={clickHandler}
        onZoomEnd={clickHandler}
        scaleControlOptions={scaleControlOptions}
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
      geoJsons: [
        {},
        {
          geoJson: {
            coordinates: [120983, 487047],
            type: 'Point'
          },
          id: 'YE39',
          type: 'dataSelection'
        },
        {
          geoJson: {
            coordinates: [120983, 487047],
            type: 'Point'
          },
          id: 'YE39',
          type: 'dataSelectionAlternate'
        }
      ]
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
      geoJsons: [
        {
          geoJson: {
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
          id: 'YE39',
          type: 'dataSelection'
        }
      ]
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render clusterer', () => {
    const center = [52.3731081, 4.8932945];
    const zoom = 11;
    const clusterMarkers = [
      {
        index: 0,
        position: [52.37282671970971, 4.883399484657262],
        type: 'detailPointType'
      },
      {
        index: 1,
        position: [52.37282671970951, 4.883399484657232],
        type: 'detailPointType'
      },
      {
        index: 2,
        position: [52.37282671970952, 4.883399484657263],
        type: 'detailPointType'
      },
      {
        index: 3,
        position: [52.37282671971952, 4.883399484657263],
        type: 'detailPointType'
      }
    ];
    const clickHandler = jest.fn();
    const layers = [];
    const wrapper = shallow(
      <MapLeaflet
        baseLayer={baseLayer}
        center={center}
        clusterMarkers={clusterMarkers}
        getLeafletInstance={getLeafletInstance}
        layers={layers}
        mapOptions={mapOptions}
        onMoveEnd={clickHandler}
        onZoomEnd={clickHandler}
        scaleControlOptions={scaleControlOptions}
        zoom={zoom}
      />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      zoom: 9
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should render markers', () => {
    const center = [52.3731081, 4.8932945];
    const zoom = 11;
    const markers = [
      {
        position: [52.37282671970971, 4.883399484657262],
        type: 'geoSearchType'
      },
      {
        position: [52.37282671970951, 4.883399484657232],
        type: 'detailPointType'
      },
      {
        position: [52.37282671970952, 4.883399484657263],
        type: 'dataSelectionType',
        iconData: {
          zoomLevel: 0,
          count: 1
        }
      },
      {
        position: [52.37282671970952, 4.883399484657263],
        type: 'dataSelectionType',
        iconData: {
          zoomLevel: 9,
          count: 9
        }
      },
      {
        position: [52.37282671970952, 4.883399484657263],
        type: 'dataSelectionType',
        iconData: {
          zoomLevel: 13,
          count: 99
        }
      },
      {
        position: [52.37282671970952, 4.883399484657263],
        type: 'dataSelectionType',
        iconData: {
          zoomLevel: 14,
          count: 9999
        }
      },
      {
        position: [52.37282671970952, 4.883399484657263],
        type: 'dataSelectionType',
        iconData: {
          zoomLevel: 15,
          count: 100
        }
      },
      {
        position: [52.37282671970952, 4.883399484657263],
        type: 'dataSelectionType',
        iconData: {
          zoomLevel: 16,
          count: 10
        }
      },
      {
        position: [52.37282671970952, 4.883399484657263],
        type: 'dataSelectionType',
        iconData: {
          zoomLevel: 19,
          count: 2
        }
      },
      {
        position: [52.37282671970952, 4.883399484657263],
        type: 'dataSelectionType',
        iconData: {
          zoomLevel: 99,
          count: 1
        }
      },
      {
        position: [52.37282671971952, 4.883399484657263],
        type: 'straatbeeldPersonType'
      },
      {
        position: [52.37282671971952, 4.883399484657263],
        type: 'straatbeeldOrientationType',
        heading: 45
      }
    ];
    const clickHandler = jest.fn();
    const layers = [];
    const wrapper = shallow(
      <MapLeaflet
        baseLayer={baseLayer}
        center={center}
        markers={markers}
        getLeafletInstance={getLeafletInstance}
        layers={layers}
        mapOptions={mapOptions}
        onMoveEnd={clickHandler}
        onZoomEnd={clickHandler}
        scaleControlOptions={scaleControlOptions}
        zoom={zoom}
      />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      zoom: 9
    });

    expect(wrapper).toMatchSnapshot();
  });
});
