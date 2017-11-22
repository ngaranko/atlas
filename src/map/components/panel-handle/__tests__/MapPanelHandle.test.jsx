import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import MapPanelHandle from '../MapPanelHandle';

describe('MapPanelHandle', () => {
  it('should render children by default', () => {
    const mapPanelHandle = shallow(
      <MapPanelHandle
        isMapPanelHandleVisible
        onMapPanelHandleToggle={() => {}}
      >
        <div className="children-test" />
      </MapPanelHandle>
    );

    expect(mapPanelHandle.find('.children-test').length).toBe(1);
    expect(mapPanelHandle).toMatchSnapshot();
  });

  it('should hide children on click', () => {
    const onButtonClickSpy = sinon.spy();
    const mapPanelHandle = shallow(
      <MapPanelHandle
        isMapPanelHandleVisible={false}
        onMapPanelHandleToggle={onButtonClickSpy}
      >
        <div className="children-test" />
      </MapPanelHandle>
    );

    mapPanelHandle.find('.map-panel-handle__toggle').simulate('click');
    expect(onButtonClickSpy.callCount).toBe(1);
    expect(mapPanelHandle.find('.children-test').length).toBe(0);
  });
});
