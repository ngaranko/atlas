import React from 'react';
import { shallow } from 'enzyme';
import NonTiledLayer from './NonTiledLayer';

describe('NonTiledLayer', () => {
  it('should render everything', () => {
    const wrapper = shallow(
      <NonTiledLayer
        url="url"
      />, {
        context: {
          layerContainer: {
            addLayer: jest.fn()
          }
        }
      }
    );
    wrapper.instance().createLeafletElement({ rotationAngle: 0 });

    expect(wrapper).toMatchSnapshot();
  });
});
