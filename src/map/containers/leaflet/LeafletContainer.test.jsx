import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import LeafletContainer from './LeafletContainer';

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
        overlays: []
      },
      user: {
        authenticated: false,
        accessToken: ''
      }
    };
  });

  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const wrapper = shallow(<LeafletContainer />, { context: { store } }).dive();

    expect(wrapper).toMatchSnapshot();
  });


  it('should render different baseLayer, zoom, center and an active layer', () => {
    const stateWithDifferentCenter = {
      ...initialState,
      map: {
        viewCenter: [52.4333137, 4.9108908],
        baseLayer: 'lf2017',
        zoom: 10,
        overlays: [
          {
            id: 'biz',
            isVisible: true
          }
        ]
      }
    };
    const store = configureMockStore()({ ...stateWithDifferentCenter });
    const wrapper = shallow(<LeafletContainer />, { context: { store } }).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
