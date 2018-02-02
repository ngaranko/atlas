import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import DrawTool, { toggleDrawing } from './DrawTool';
import drawToolConfig from '../../services/draw-tool/draw-tool-config';
import {
  cancel,
  disable,
  enable,
  initialize,
  isEnabled,
  setPolygon
} from '../../services/draw-tool/draw-tool';

jest.mock('../../services/draw-tool/draw-tool');

describe('The toggleDrawing functionality', () => {
  beforeEach(() => {
    enable.mockClear();
    disable.mockClear();
    setPolygon.mockClear();
  });

  it('should trigger toggle drawing on when clicked with zero markers', () => {
    isEnabled.mockImplementation(() => false);

    toggleDrawing(0);

    expect(enable).toHaveBeenCalled();
      // is should NOT reset polygon when there are no markers
    expect(setPolygon).not.toHaveBeenCalled();
  });

  it('should trigger toggle drawing off when clicked', () => {
    isEnabled.mockImplementation(() => true);

    toggleDrawing(0);
    expect(disable).toHaveBeenCalled();
  });

  it('should trigger toggle drawing on when clicked with 2 markers', () => {
    isEnabled.mockImplementation(() => false);

    toggleDrawing(2);
    expect(enable).toHaveBeenCalled();
      // is should reset polygon when there are no markers
    expect(setPolygon).toHaveBeenCalledWith([]);
  });
});

describe('DrawTool', () => {
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
      expect(wrapper.state('drawingMode')).toBe('draw');

      wrapper.setProps({ drawingMode: 'none' });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('drawingMode')).toBe('none');
    });

    it('should save previous markers and trigger cancel when line has been drawn', () => {
      cancel.mockReset();

      const store = configureMockStore()({ ...initialState });
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
      expect(wrapper.state('previousMarkers')).toEqual([]);
      expect(cancel).not.toHaveBeenCalled();

      wrapper.setProps({ drawingMode: 'draw' });
      wrapper.setProps({
        geometry: [[52.3, 4.8], [52.4, 4.9]],
        shapeMarkers: 2,
        shapeDistanceTxt: '1.89 km'
      });
      wrapper.setProps({ drawingMode: 'none' });

      expect(setPolygon).toHaveBeenCalledWith([[52.3, 4.8], [52.4, 4.9]]);
      expect(wrapper.state('previousMarkers')).toEqual([[52.3, 4.8], [52.4, 4.9]]);
      expect(wrapper).toMatchSnapshot();
      expect(cancel).toHaveBeenCalledTimes(1);
    });

    it('should save previous markers and trigger cancel when polygon has been drawn', () => {
      cancel.mockReset();

      const store = configureMockStore()({ ...initialState });
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
      expect(wrapper.state('previousMarkers')).toEqual([]);
      expect(cancel).not.toHaveBeenCalled();

      wrapper.setProps({ drawingMode: 'draw' });
      wrapper.setProps({
        dataSelection: {
          geometryFilter: {
            markers: [[52.3, 4.8], [52.4, 4.9], [53, 5]]
          }
        },
        shapeMarkers: 3,
        shapeDistanceTxt: '2.18 km'
      });
      wrapper.setProps({ drawingMode: 'none' });

      expect(setPolygon).toHaveBeenCalledWith([[52.3, 4.8], [52.4, 4.9], [53, 5]]);
      expect(wrapper.state('previousMarkers')).toEqual([[52.3, 4.8], [52.4, 4.9], [53, 5]]);
      expect(wrapper).toMatchSnapshot();
      expect(cancel).toHaveBeenCalledTimes(1);
    });

    it('setPolygon should only render polygon when drawing is not active', () => {
      const store = configureMockStore()({ ...initialState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
      const instance = wrapper.instance();
      setPolygon.mockReset();

      isEnabled.mockImplementation(() => true);
      instance.setPolygon();
      expect(setPolygon).not.toHaveBeenCalled();

      isEnabled.mockImplementation(() => false);
      instance.setPolygon();
      expect(setPolygon).toHaveBeenCalled();
    });
  });

  describe('callbacks', () => {
    describe('onFinishShape', () => {
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
          payload: { isMapFullscreen: false },
          type: 'SET_MAP_FULLSCREEN'
        });

        // trigger again with same markers should not dispatch any action
        expect(store.dispatch.mock.calls.length).toBe(4);
        wrapper.setState({
          previousMarkers: [1, 2, 3, 4]
        });
        instance.onFinishShape({
          markers: [1, 2, 3, 4]
        });
        expect(store.dispatch.mock.calls.length).toBe(4);
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


  it('should render points available, shape summary and toggle drawing', () => {
    const store = configureMockStore()({ ...initialState });
    const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render summary for 2 points', () => {
    const store = configureMockStore()({
      ...initialState,
      map: {
        ...initialState.map,
        shapeMarkers: 2
      }
    });
    isEnabled.mockImplementation(() => true);
    const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render points available almost max points drawn', () => {
    const store = configureMockStore()({
      ...initialState,
      map: {
        ...initialState.map,
        shapeMarkers: 10
      }
    });
    const wrapper = shallow(<DrawTool />, { context: { store } }).dive();
    wrapper.setState({ drawingMode: 'bar' });
    expect(wrapper).toMatchSnapshot();
  });
});
