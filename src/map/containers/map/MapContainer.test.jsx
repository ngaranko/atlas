import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import MapContainer from './MapContainer';

import piwikTracker from '../../../shared/services/piwik-tracker/piwik-tracker';

jest.mock('../../../shared/services/piwik-tracker/piwik-tracker');

let initialState;

describe('MapContainer', () => {
  beforeEach(() => {
    initialState = {
      ui: {
        isMapFullscreen: false
      },
      map: {
        drawingMode: 'none'
      }
    };
  });

  it('should render', () => {
    const store = configureMockStore()({ ...initialState });
    const wrapper = shallow(<MapContainer />, { context: { store } }).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render with drawingmode: draw', () => {
    const store = configureMockStore()({ ...initialState, map: { drawingMode: 'draw' } });
    const wrapper = shallow(<MapContainer />, { context: { store } }).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('should set the leaflet instance state', () => {
    const store = configureMockStore()({ ...initialState });
    const wrapper = shallow(<MapContainer />, { context: { store } }).dive();
    wrapper.instance().setLeafletInstance('leafletInstance');
    expect(wrapper.instance().state.leafletInstance).toBe('leafletInstance');
  });

  it('should hide the fullscreen and send piwik action', () => {
    const store = configureMockStore()({ ...initialState, ui: { isMapFullscreen: true } });
    const wrapper = shallow(<MapContainer />, { context: { store } }).dive();
    wrapper.instance().onToggleFullscreen();
    piwikTracker.mockImplementation(() => jest.fn());
    expect(piwikTracker).toHaveBeenCalled();
    // should not send another piwik event if map is maximized
    wrapper.setProps({ isFullscreen: false });
    wrapper.instance().onToggleFullscreen();
    expect(piwikTracker).toHaveBeenCalledTimes(1);
  });
});
