import React from 'react';
import { shallow } from 'enzyme';

import DrawTool from './DrawTool';
import drawToolConfig from '../../services/draw-tool/draw-tool-config';

describe('DrawTool', () => {
  let initialize;
  let setPolygon;
  let isEnabled;
  let cancel;
  let onMapUpdateShape;
  let onEndDrawing;
  let defaultProps;
  let setGeometryFilter;
  let onSetPageName;
  let onSetMapFullscreen;

  beforeEach(() => {
    initialize = jest.fn();
    setPolygon = jest.fn();
    isEnabled = jest.fn();
    cancel = jest.fn();
    onEndDrawing = jest.fn();
    onMapUpdateShape = jest.fn();
    setGeometryFilter = jest.fn();
    onSetPageName = jest.fn();
    onSetMapFullscreen = jest.fn();
    defaultProps = {
      initialize,
      setPolygon,
      isEnabled,
      cancel,
      onMapUpdateShape,
      onEndDrawing,
      setGeometryFilter,
      onSetPageName,
      onSetMapFullscreen,
      onClearDrawing: jest.fn(),
      toggleDrawing: jest.fn(),
      drawingMode: drawToolConfig.DRAWING_MODE.NONE,
      currentShape: {},

      geometry: null,
      shapeMarkers: 0,
      shapeDistanceTxt: '',
      dataSelection: null
    };
  });

  describe('actions', () => {
    it('should be initialized first', () => {
      const wrapper = shallow(<DrawTool {...defaultProps} />);

      expect(initialize).toHaveBeenCalledTimes(1);
      expect(setPolygon).toHaveBeenCalledWith([]);
      expect(wrapper).toMatchSnapshot();
    });

    it('should turn drawing on and off when drawing mode has switched', () => {
      const wrapper = shallow(<DrawTool {...defaultProps} />);

      wrapper.setProps({ drawingMode: 'draw' });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('drawingMode')).toBe('draw');

      wrapper.setProps({ drawingMode: 'none' });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('drawingMode')).toBe('none');
    });

    it('should save previous markers and trigger cancel when line has been drawn', () => {
      cancel.mockReset();

      const wrapper = shallow(<DrawTool {...defaultProps} />);
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

      const wrapper = shallow(<DrawTool {...defaultProps} />);
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
      const wrapper = shallow(<DrawTool {...defaultProps} />);
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
    it('onFinishShape should dispatch action when a line has been drawn', () => {
      const wrapper = shallow(<DrawTool {...defaultProps} />);
      const instance = wrapper.instance();

      expect(typeof instance.onFinishShape).toBe('function');

      instance.onFinishShape({
        markers: [1, 2],
        distanceTxt: 'a',
        areaTxt: 'b'
      });

      expect(onEndDrawing).toHaveBeenCalledWith({
        polygon: {
          areaTxt: 'b',
          distanceTxt: 'a',
          markers: [1, 2]
        }
      });
    });

    it('onFinishShape should dispatch actions when a polygon has been drawn and map is fullscreen', () => {
      const wrapper = shallow((<DrawTool
        {...defaultProps}
        isMapFullscreen
      />));
      const instance = wrapper.instance();

      instance.onFinishShape({
        markers: [1, 2, 3, 4],
        distanceTxt: 'a',
        areaTxt: 'b'
      });

      //   expect(store.dispatch).toHaveBeenCalledWith({
      //     payload: {
      //       polygon: {
      //         areaTxt: 'b',
      //         distanceTxt: 'a',
      //         markers: [1, 2, 3, 4]
      //       }
      //     },
      //     type: 'MAP_END_DRAWING'
      //   });
      //   expect(store.dispatch).toHaveBeenCalledWith({
      //     payload: {
      //       name: null
      //     },
      //     type: 'SET_PAGE_NAME'
      //   });
      //   expect(store.dispatch).toHaveBeenCalledWith({
      //     payload: {
      //       description: 'a en b',
      //       markers: [1, 2, 3, 4]
      //     },
      //     type: 'SET_DATA_SELECTION_GEOMETRY_FILTER'
      //   });
      //   expect(store.dispatch).toHaveBeenCalledWith({
      //     payload: { isMapFullscreen: false },
      //     type: 'SET_MAP_FULLSCREEN'
      //   });

      //   // trigger again with same markers should not dispatch any action
      //   expect(store.dispatch.mock.calls.length).toBe(4);
      //   wrapper.setState({
      //     previousMarkers: [1, 2, 3, 4]
      //   });
      //   instance.onFinishShape({
      //     markers: [1, 2, 3, 4]
      //   });
      //   expect(store.dispatch.mock.calls.length).toBe(4);
      // });
    });

    // it('onDrawingMode should call prop functions', () => {
    //   // const store = configureMockStore()({ ...initialState });

    //   const wrapper = shallow(<DrawTool {...defaultProps} />);
    //   const instance = wrapper.instance();

    //   expect(typeof instance.onDrawingMode).toBe('function');

    //   instance.onDrawingMode('draw');
    //   // expect(store.dispatch).toHaveBeenCalledWith({
    //   //   payload: {
    //   //     drawingMode: 'draw'
    //   //   },
    //   //   type: 'MAP_START_DRAWING'
    //   // });
    //   // expect(store.dispatch).toHaveBeenCalledWith({
    //   //   payload: {
    //   //     drawingMode: 'draw'
    //   //   },
    //   //   type: 'RESET_DATA_SELECTION_GEOMETRY_FILTER'
    //   // });

    //   instance.onDrawingMode('none');
    //   // expect(store.dispatch).toHaveBeenCalledWith({ type: 'MAP_END_DRAWING' });
    // });

    it('onUpdateShape should call function', () => {
      // const store = configureMockStore()({ ...initialState });

      const wrapper = shallow(<DrawTool {...defaultProps} />);
      const instance = wrapper.instance();

      expect(typeof instance.onUpdateShape).toBe('function');

      instance.onUpdateShape({
        markers: [1, 2, 3],
        distanceTxt: 'a',
        areaTxt: 'b'
      });

      expect(onMapUpdateShape).toHaveBeenCalledWith({
        shapeAreaTxt: 'b',
        shapeDistanceTxt: 'a',
        shapeMarkers: 3
      });
    });

  // it('should render points available, shape summary and toggle drawing', () => {
  //   // const store = configureMockStore()({ ...initialState });
  //   const wrapper = shallow(<DrawTool {...defaultProps} />);
  //   expect(wrapper).toMatchSnapshot();
  // });

  // it('should render summary for 2 points', () => {
  //   // const store = configureMockStore()({
  //   //   ...initialState,
  //   //   map: {
  //   //     ...initialState.map,
  //   //     shapeMarkers: 2
  //   //   }
  //   // });
  //   isEnabled.mockImplementation(() => true);
  //   const wrapper = shallow(<DrawTool {...defaultProps} />);
  //   expect(wrapper).toMatchSnapshot();
  // });

  // it('should render points available almost max points drawn', () => {
  //   // const store = configureMockStore()({
  //   //   ...initialState,
  //   //   map: {
  //   //     ...initialState.map,
  //   //     shapeMarkers: 10
  //   //   }
  //   // });
  //   const wrapper = shallow(<DrawTool {...defaultProps} />);
  //   wrapper.setState({ drawingMode: 'bar' });
  //   expect(wrapper).toMatchSnapshot();
  // });
  });
});
