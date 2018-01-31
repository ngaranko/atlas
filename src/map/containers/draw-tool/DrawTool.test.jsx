import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import DrawTool from './DrawTool';
import drawToolConfig from '../../services/draw-tool/draw-tool-config';
import { initialize, cancel, isEnabled, setPolygon, currentShape } from '../../services/draw-tool/draw-tool';

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

  describe('actions', () => {
    it('should be initialized first', () => {
      // initialize.mockImplementation(() => false);
      const store = configureMockStore()({ ...initialState });
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();

      expect(initialize).toHaveBeenCalledTimes(1);
      expect(setPolygon).toHaveBeenCalledWith([]);
      expect(wrapper).toMatchSnapshot();
    });

    it('should turn drawing on and off when drawing mode has switched', () => {
      const store = configureMockStore()({ ...initialState });
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();

      wrapper.setProps({ drawingMode: 'draw' });
      expect(wrapper).toMatchSnapshot();
      expect(cancel).not.toHaveBeenCalled();
      expect(wrapper.state('drawingMode')).toBe('draw');

      wrapper.setProps({ drawingMode: 'none' });
      expect(wrapper).toMatchSnapshot();
      expect(cancel).toHaveBeenCalledTimes(1);
      expect(wrapper.state('drawingMode')).toBe('none');
    });

    it('should save previous markers and trigger cancel when shape has been drawn', () => {
      const store = configureMockStore()({ ...initialState });
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
      expect(wrapper.state('previousMarkers')).toEqual([]);

      wrapper.setProps({ drawingMode: 'draw' });
      wrapper.setProps({
        geometry: [[52.3, 4.8], [52.4, 4.9], [53, 5]],
        shapeMarkers: 2,
        shapeDistanceTxt: '1.89 km'
      });
      wrapper.setProps({ drawingMode: 'none' });

      expect(setPolygon).toHaveBeenCalledWith([[52.3, 4.8], [52.4, 4.9], [53, 5]]);
      expect(wrapper.state('previousMarkers')).toEqual([[52.3, 4.8], [52.4, 4.9], [53, 5]]);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('rendering', () => {
    it('should render points available, shape summary and toggle drawing', () => {
      const store = configureMockStore()({ ...initialState });
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
