import reducer, {
  resetDataSelectionGeometryFilter,
  setDataSelectionGeometryFilter
} from './data-selection';

describe('DataSelection Reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  it('should set the initial state', () => {
    expect(state).toEqual({
      geometryFilter: {
        markers: []
      },
      isLoading: true,
      markers: []
    });
  });

  it('should set the geometryFilter', () => {
    expect(reducer(state, setDataSelectionGeometryFilter({
      markers: [{
        marker: 'a'
      }]
    }))).toEqual({
      ...state,
      dataset: 'bag',
      isFullscreen: false,
      page: 1,
      reset: false,
      view: 'LIST',
      geometryFilter: {
        markers: [{
          marker: 'a'
        }]
      }
    });
  });

  describe('geometryFilter', () => {
    it('should do nothing if drawingMode != edit or if polygon is an empty array', () => {
      expect(reducer(state, resetDataSelectionGeometryFilter({
        polygon: [{
          marker: 'a'
        }]
      }))).toEqual({
        ...state,
        geometryFilter: {
          markers: []
        }
      });
    });

    it('should ', () => {
      expect(reducer({
        ...state,
        geometryFilter: {
          markers: [{
            marker: 'a'
          }]
        }
      }, resetDataSelectionGeometryFilter({
        polygon: {
          markers: [{
            marker: 'b'
          }]
        }
      }))).toEqual({
        ...state,
        dataset: 'bag',
        isFullscreen: false,
        page: 1,
        reset: false,
        view: 'LIST',
        geometryFilter: {
          markers: [{
            marker: 'b'
          }]
        }
      });
    });
  });
});
