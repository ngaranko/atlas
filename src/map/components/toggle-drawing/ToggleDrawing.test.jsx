import React from 'react';
import { shallow } from 'enzyme';

import ToggleDrawing from './ToggleDrawing';
import drawToolConfig from '../../services/draw-tool/draw-tool-config';
import { enable, disable, setPolygon, isEnabled } from '../../services/draw-tool/draw-tool';

jest.mock('../../services/draw-tool/draw-tool');

describe('ToggleDrawing', () => {
  describe('actions', () => {
    beforeEach(() => {
      enable.mockClear();
      disable.mockClear();
      setPolygon.mockClear();
    });

    it('should trigger toggle drawing on when clicked with zero markers', () => {
      isEnabled.mockImplementation(() => false);

      const wrapper = shallow(
        <ToggleDrawing
          drawingMode={drawToolConfig.DRAWING_MODE.NONE}
          shapeMarkers={0}
        />
      );
      wrapper.find('button').at(0).simulate('click');
      expect(enable.mock.calls.length).toBe(1);

      // is should NOT reset polygon when there are no markers
      expect(setPolygon.mock.calls.length).toBe(0);
    });

    it('should trigger toggle drawing off when clicked', () => {
      isEnabled.mockImplementation(() => true);

      const wrapper = shallow(
        <ToggleDrawing
          drawingMode={drawToolConfig.DRAWING_MODE.DRAW}
          shapeMarkers={0}
        />
      );
      wrapper.find('button').at(0).simulate('click');
      expect(disable.mock.calls.length).toBe(1);
    });

    it('should trigger toggle drawing on when clicked with 2 markers', () => {
      isEnabled.mockImplementation(() => false);

      const wrapper = shallow(
        <ToggleDrawing
          drawingMode={drawToolConfig.DRAWING_MODE.NONE}
          shapeMarkers={2}
        />
      );
      wrapper.find('button').at(0).simulate('click');
      expect(enable.mock.calls.length).toBe(1);

      // is should reset polygon when there are no markers
      expect(setPolygon.mock.calls.length).toBe(1);
    });
  });

  describe('rendering', () => {
    it('should render with drawing mode none and no markers', () => {
      const wrapper = shallow(
        <ToggleDrawing
          drawingMode={drawToolConfig.DRAWING_MODE.NONE}
          shapeMarkers={0}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with drawing mode none and 3 markers showing "Opnieuw tekenen"', () => {
      const wrapper = shallow(
        <ToggleDrawing
          drawingMode={drawToolConfig.DRAWING_MODE.NONE}
          shapeMarkers={3}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should render with drawing mode draw and 3 markers showing "Eindig tekenen"', () => {
      const wrapper = shallow(
        <ToggleDrawing
          drawingMode={drawToolConfig.DRAWING_MODE.DRAW}
          shapeMarkers={3}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
