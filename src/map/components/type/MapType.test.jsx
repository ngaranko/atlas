import React from 'react';
import { shallow } from 'enzyme';

import MapType from './MapType';

let baseLayers;

describe('MapType', () => {
  beforeEach(() => {
    baseLayers = {
      topography: [
        {
          value: 'topografie',
          label: 'Topografie',
          selected: true,
          urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd/{z}/{x}/{y}.png'
        }, {
          value: 'topo_rd_light',
          label: 'Topografie licht',
          urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd_light/{z}/{x}/{y}.png'
        }, {
          value: 'topo_rd_zw',
          label: 'Topografie grijs',
          urlTemplate: 'https://{s}.data.amsterdam.nl/topo_rd_zw/{z}/{x}/{y}.png'
        }
      ],
      aerial: [
        {
          value: 'lf2017',
          label: 'Luchtfoto 2017',
          selected: true,
          urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2017_RD/{z}/{x}/{y}.jpeg'
        }, {
          value: 'lf2016',
          label: 'Luchtfoto 2016',
          urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2016_RD/{z}/{x}/{y}.jpeg'
        }, {
          value: 'lf2015',
          label: 'Luchtfoto 2015',
          urlTemplate: 'https://{s}.data.amsterdam.nl/lufo2015_RD/{z}/{x}/{y}.jpeg'
        }
      ]
    };
  });

  describe('rendering', () => {
    it('should render two SelectButton components', () => {
      const toggleHandler = jest.fn();
      const wrapper = shallow(
        <MapType
          activeBaseLayer="lf2016"
          baseLayers={baseLayers}
          onBaseLayerToggle={toggleHandler}
        />
      );
      expect(wrapper.find('SelectButton').length).toBe(2);
    });

    it('should render select buttons with topography value', () => {
      const toggleHandler = jest.fn();
      const wrapper = shallow(
        <MapType
          activeBaseLayer="topo_rd_light"
          baseLayers={baseLayers}
          onBaseLayerToggle={toggleHandler}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should render select buttons with aerial value', () => {
      const toggleHandler = jest.fn();
      const wrapper = shallow(
        <MapType
          activeBaseLayer="lf2015"
          baseLayers={baseLayers}
          onBaseLayerToggle={toggleHandler}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
