import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import DrawTool from './DrawTool';
import drawToolConfig from '../../services/draw-tool/draw-tool-config';
import { enable, disable, setPolygon, isEnabled } from '../../services/draw-tool/draw-tool';

jest.mock('../../services/draw-tool/draw-tool');

describe('ToggleDrawing', () => {
  const initialState = {
    map: {
      drawingMode: drawToolConfig.DRAWING_MODE.NONE,
      geometry: null,
      shapeMarkers: 0,
      shapeDistanceTxt: ''
    },
    dataSelection: null,
    ui: {
      isMapFullscreen: false
    }
  };

  // describe('actions', () => {
    // beforeEach(() => {
      // enable.mockClear();
      // disable.mockClear();
      // setPolygon.mockClear();
    // });

    // it('should trigger toggle drawing on when clicked with zero markers', () => {
    //   isEnabled.mockImplementation(() => false);
    //
    //   const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
    //   wrapper.find('button').at(0).simulate('click');
    //   expect(enable).toHaveBeenCalled();
    //
    //   // is should NOT reset polygon when there are no markers
    //   expect(setPolygon).not.toHaveBeenCalled();
    // });
//
    // it('should trigger toggle drawing off when clicked', () => {
    //   isEnabled.mockImplementation(() => true);
    //
    //   const wrapper = shallow(
    //     <ToggleDrawing
    //       drawingMode={drawToolConfig.DRAWING_MODE.DRAW}
    //       shapeMarkers={0}
    //     />
    //   );
    //   wrapper.find('button').at(0).simulate('click');
    //   expect(disable).toHaveBeenCalled();
    // });
    //
    // it('should trigger toggle drawing on when clicked with 2 markers', () => {
    //   isEnabled.mockImplementation(() => false);
    //
    //   const wrapper = shallow(
    //     <ToggleDrawing
    //       drawingMode={drawToolConfig.DRAWING_MODE.NONE}
    //       shapeMarkers={2}
    //     />
    //   );
    //   wrapper.find('button').at(0).simulate('click');
    //   expect(enable).toHaveBeenCalled();
    //
    //   // is should reset polygon when there are no markers
    //   expect(setPolygon).toHaveBeenCalledWith([]);
    // });
  // });

  describe('rendering', () => {
    it('should render with initial state', () => {
      const store = configureMockStore()({ ...initialState });
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
