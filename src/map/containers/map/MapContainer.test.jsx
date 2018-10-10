import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import MapContainer from './MapContainer';

let initialState;

describe('MapContainer', () => {
  beforeEach(() => {
    initialState = {
      currentPage: '',
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
});
