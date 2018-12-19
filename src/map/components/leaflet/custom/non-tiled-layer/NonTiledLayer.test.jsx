import React from 'react';
import L from 'leaflet';
import { shallow } from 'enzyme';
import NonTiledLayer from './NonTiledLayer';

jest.mock('leaflet');

describe('NonTiledLayer', () => {
  let wrapper;
  let wrapperInstance;
  const props = {
    url: 'https://wms-url',
    rotationAngle: 0,
    layers: ['wms-layer'],
    opacity: 100
  };

  beforeEach(() => {
    L.nonTiledLayer = {
      wms: jest.fn()
    };


    wrapper = shallow(
      <NonTiledLayer
        {...props}
      />, {
        context: {
          layerContainer: {
            addLayer: jest.fn()
          }
        }
      }
    );
    wrapperInstance = wrapper.instance();
  });

  it('should render everything', () => {
    expect(L.nonTiledLayer.wms).toHaveBeenCalledTimes(1);
    expect(L.nonTiledLayer.wms).toHaveBeenCalledWith(
      props.url,
      {
        rotationAngle: 0,
        layers: ['wms-layer'],
        opacity: 100
      }
    );
  });

  it('should update the layers when the property is changed', () => {
    wrapperInstance.leafletElement = {
      _wmsUrl: 'http://old-wms-url',
      wmsParams: { layers: ['old-layer'] }
    };

    const fromProps = {
      url: 'http://old-wms-url',
      layers: ['old-layer']
    };
    const toProps = {
      url: 'http://new-wms-url',
      layers: ['new-layer']
    };

    wrapperInstance.updateLeafletElement(fromProps, toProps);
    expect(wrapperInstance.leafletElement).toEqual({
      _wmsUrl: 'http://new-wms-url',
      wmsParams: { layers: ['new-layer'] }
    });
  });

  it('should hide the layer', () => {
    wrapperInstance.leafletElement = {
      setOpacity: jest.fn()
    };

    const fromProps = {
      opacity: 100
    };
    const toProps = {
      opacity: 0
    };

    wrapperInstance.updateLeafletElement(fromProps, toProps);
    expect(wrapperInstance.leafletElement.setOpacity).toHaveBeenCalledWith(toProps.opacity);
  });
});
