import React from 'react';
import L from 'leaflet';
import { shallow } from 'enzyme';
import MapBusyIndicator, { DATA_LOADING_EVENT, DATA_LOADED_EVENT } from './MapBusyIndicator';

jest.mock('leaflet');
jest.mock('react-leaflet');

describe('MapBusyIndicator', () => {
  let wrapper;
  let wrapperInstance;
  const map = {
    on: jest.fn(),
    off: jest.fn(),
    fire: jest.fn()
  };


  beforeAll(() => {
    L.Control.extend.mockImplementation(() => jest.fn());
  });

  beforeEach(() => {
    wrapper = shallow(
      <MapBusyIndicator
        loading={false}
      />, {
        context: {
          map
        }
      }
    );
    wrapperInstance = wrapper.instance();
  });

  it('should render an empty component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should add the control to the leaflet instance', () => {
    wrapperInstance.createLeafletElement();
    expect(L.Control.extend).toHaveBeenCalled();
  });

  it('should never update', () => {
    expect(wrapperInstance.shouldComponentUpdate()).toBe(false);
  });

  it('should show the indicator when the loading prop is set', () => {
    wrapperInstance.componentWillReceiveProps({ loading: true });
    expect(map.fire).toHaveBeenCalledWith(DATA_LOADING_EVENT);
  });

  it('should do nothing when the loading prop is not changed', () => {
    map.fire.mockClear();
    expect(map.fire).not.toHaveBeenCalled();
    wrapper.setProps({ loading: false });
    wrapperInstance.componentWillReceiveProps({ loading: false });
    expect(map.fire).not.toHaveBeenCalled();
  });

  it('should hide the indicator when the loading prop is set', () => {
    wrapper.setProps({ loading: true });
    wrapperInstance.componentWillReceiveProps({ loading: false });
    expect(map.fire).toHaveBeenCalledWith(DATA_LOADED_EVENT);
  });

  describe('mapControlExtension', () => {
    let mapControlExtension;
    beforeEach(() => {
      mapControlExtension = wrapperInstance.createMapContolExtension();
    });

    it('should create mapControlExtension', () => {
      expect(mapControlExtension).toBeDefined();
    });

    it('should inititalize the control', () => {
      const options = { foo: 'bar' };
      mapControlExtension.initialize(options);
      expect(L.setOptions).toHaveBeenLastCalledWith(mapControlExtension, options);
      expect(mapControlExtension.dataLoaders).toEqual({});
    });

    it('should hook the loading events and add the control to the map', () => {
      mapControlExtension.onAdd(map);
      expect(map.on).toHaveBeenCalled();
    });

    it('should remove the events when the map is unloaded', () => {
      mapControlExtension.onRemove(map);

      expect(map.off).toHaveBeenCalled();
    });

    it('should handleLoading', () => {
      mapControlExtension.handleLoading();
      expect(L.DomUtil.addClass).toHaveBeenCalled();
    });

    it('should handleLoaded', () => {
      mapControlExtension.handleLoaded();
      expect(L.DomUtil.removeClass).toHaveBeenCalled();
    });
  });
});
