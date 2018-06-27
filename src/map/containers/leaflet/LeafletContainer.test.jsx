import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import LeafletContainer from './LeafletContainer';
import {
  getActiveBaseLayer,
  getCenter,
  getClusterMarkers,
  getGeoJsons,
  getMapOverlays,
  getMarkers,
  getRdGeoJsons,
  updateBoundingBox,
  updatePan,
  updateZoom
} from '../../ducks/map/map';
import { getUrlTemplate } from '../../ducks/base-layers/map-base-layers';

jest.mock('../../ducks/map/map');
jest.mock('../../ducks/base-layers/map-base-layers');

let initialState;

const mapLayers = {
  layers: {
    items: [
      {
        id: 'biz',
        url: 'maps/biz',
        layers: ['biz_polygons'],
        detailUrl: 'geosearch/biz/',
        detailItem: 'biz',
        detailIsShape: true
      }
    ]
  },
  baseLayers: {
    items: [
      {
        value: 'topografie',
        label: 'Topografie',
        category: 'topography',
        selected: true,
        urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png'
      },
      {
        value: 'lf2017',
        label: 'Luchtfoto 2017',
        category: 'aerial',
        selected: true,
        urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2017_RD/{z}/{x}/{y}.jpeg'
      }
    ]
  }
};

describe('LeafletContainer', () => {
  beforeEach(() => {
    initialState = {
      mapLayers,
      map: {
        viewCenter: [52.4138254, 4.8728099],
        baseLayer: 'topografie',
        zoom: 8,
        overlays: [],
        drawingMode: 'none'
      },
      user: {
        authenticated: false,
        accessToken: ''
      },
      mapDetail: {
        currentEndpoint: '',
        byEndpoint: {}
      },
      ui: {
        map: true,
        detail: false
      },
      getLeafletInstance: () => ''
    };
    getActiveBaseLayer.mockImplementation(() => 'topografie');
    getCenter.mockImplementation(() => [0, 0]);
    getClusterMarkers.mockImplementation(() => []);
    getGeoJsons.mockImplementation(() => []);
    getMapOverlays.mockImplementation(() => []);
    getMarkers.mockImplementation(() => []);
    getRdGeoJsons.mockImplementation(() => []);
    updateBoundingBox.mockImplementation(() => ({}));
    updatePan.mockImplementation(() => ({}));
    updateZoom.mockImplementation(() => ({}));
    getUrlTemplate.mockImplementation(() => 'https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png');
  });

  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const wrapper = shallow(
      <LeafletContainer
        getLeafletInstance={initialState.getLeafletInstance}
      />, { context: { store } }
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });


  it('should render different baseLayer, zoom, center and an active layer', () => {
    const stateWithDifferentCenter = {
      ...initialState,
      map: {
        viewCenter: [52.4333137, 4.9108908],
        baseLayer: 'lf2017',
        zoom: 10,
        ui: {
          map: true,
          detail: true
        },
        overlays: [
          {
            id: 'biz',
            isVisible: true
          }
        ],
        drawingMode: 'none'
      }
    };
    getCenter.mockImplementation(() => [52.4333137, 4.9108908]);
    getClusterMarkers.mockImplementation(() => [
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
    ]);
    getGeoJsons.mockImplementation(() => [
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
    ]);
    getMapOverlays.mockImplementation(() => [
      {
        id: 'biz',
        isVisible: true
      }
    ]);
    getMarkers.mockImplementation(() => [
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
        iconData: 15
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
    ]);
    getRdGeoJsons.mockImplementation(() => [
      {
        geoJson: {
          coordinates: [120983, 487047],
          type: 'Point'
        },
        id: 'YE39'
      }
    ]);
    const store = configureMockStore()({ ...stateWithDifferentCenter });
    const wrapper = shallow(
      <LeafletContainer
        getLeafletInstance={initialState.getLeafletInstance}
      />, { context: { store } }).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
