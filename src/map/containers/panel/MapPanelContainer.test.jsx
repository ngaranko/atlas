import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import MapPanelContainer from './MapPanelContainer';
import MapLayers from '../../components/layers/MapLayers';
import MapLegend from '../../components/legend/MapLegend';
import MapType from '../../components/type/MapType';

import piwikTracker from '../../../shared/services/piwik-tracker/piwik-tracker';

jest.mock('../../../shared/services/piwik-tracker/piwik-tracker');

describe('MapPanelContainer', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = configureMockStore()({
      map: {
        baseLayer: '',
        overlays: [{
          isVisible: true
        }]
      },
      mapLayers: {
        layers: {
          items: []
        },
        baseLayers: {
          items: []
        },
        panelLayers: {
          items: []
        }
      },
      overlays: [{}],
      ui: { isMapPanelHandleVisible: true }
    });
    wrapper = shallow(<MapPanelContainer />, { context: { store } }).dive();
  });

  it('should render MapType and MapLayers', () => {
    expect(wrapper.find(MapType).length).toBe(1);
    expect(wrapper.find(MapLayers).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render MapLegend if store contains active map layers', () => {
    expect(wrapper.find(MapLegend).length).toBe(0);
    wrapper.setProps({ activeMapLayers: [{}] });
    piwikTracker.mockImplementation(() => jest.fn());
    expect(wrapper.find(MapLegend).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should scroll the map-legend is map panel is visible and have more overlays', () => {
    const scrollIntoViewMock = jest.fn();
    document.querySelector = jest.fn().mockReturnValue({
      scrollIntoView: scrollIntoViewMock
    });
    wrapper.setProps({
      overlays: [{}, {}],
      isMapPanelVisible: true
    });
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});
