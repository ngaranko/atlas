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

  describe('callbacks', () => {
    it('onFinishShape should dispatch action when a line has been drawn', () => {
      const store = configureMockStore()({ ...initialState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
      const instance = wrapper.instance();

      expect(typeof instance.onFinishShape).toBe('function');

      instance.onFinishShape({
        markers: [1, 2],
        distanceTxt: 'a',
        areaTxt: 'b'
      });

      expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
          polygon: {
            areaTxt: 'b',
            distanceTxt: 'a',
            markers: [1, 2]
          }
        },
        type: 'MAP_END_DRAWING'
      });
    });

    it('onFinishShape should dispatch actions when a polygon has been drawn and map is fullscreen', () => {
      const store = configureMockStore()({
        ...initialState,
        ui: {
          ...initialState.ui,
          isMapFullscreen: true
        }
      });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
      const instance = wrapper.instance();

      instance.onFinishShape({
        markers: [1, 2, 3, 4],
        distanceTxt: 'a',
        areaTxt: 'b'
      });

      expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
          polygon: {
            areaTxt: 'b',
            distanceTxt: 'a',
            markers: [1, 2, 3, 4]
          }
        },
        type: 'MAP_END_DRAWING'
      });
      expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
          name: null
        },
        type: 'SET_PAGE_NAME'
      });
      expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
          description: 'a en b',
          markers: [1, 2, 3, 4]
        },
        type: 'SET_DATA_SELECTION_GEOMETRY_FILTER'
      });
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'TOGGLE_MAP_FULLSCREEN'
      });
    });

    it('onDrawingMode should dispatch actions', () => {
      const store = configureMockStore()({ ...initialState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
      const instance = wrapper.instance();

      expect(typeof instance.onDrawingMode).toBe('function');

      instance.onDrawingMode('draw');
      expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
          drawingMode: 'draw'
        },
        type: 'MAP_START_DRAWING'
      });
      expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
          drawingMode: 'draw'
        },
        type: 'RESET_DATA_SELECTION_GEOMETRY_FILTER'
      });

      instance.onDrawingMode('none');
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'MAP_END_DRAWING' });
    });

    it('onUpdateShape should dispatch action', () => {
      const store = configureMockStore()({ ...initialState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
      const instance = wrapper.instance();

      expect(typeof instance.onUpdateShape).toBe('function');

      instance.onUpdateShape({
        markers: [1, 2, 3],
        distanceTxt: 'a',
        areaTxt: 'b'
      });

      expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
          shapeAreaTxt: 'b',
          shapeDistanceTxt: 'a',
          shapeMarkers: 3
        },
        type: 'MAP_UPDATE_SHAPE'
      });
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
