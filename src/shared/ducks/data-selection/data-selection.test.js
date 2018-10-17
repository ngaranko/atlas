import reducer, {
  NAVIGATE_DATA_SELECTION, RESET_DATA_SELECTION,
  resetDataSelectionGeometryFilter, SET_DATA_SELECTION_VIEW,
  setDataSelectionGeometryFilter, SHOW_DATA_SELECTION
} from './data-selection';
import { FETCH_DATA_SELECTION } from '../../../header/ducks/search/search';

describe('DataSelection Reducer', () => {
  let state;
  const initialState = {
    markers: [],
    geometryFilter: {
      markers: []
    },
    isLoading: true
  };

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
      isFullscreen: false,
      page: 1,
      reset: false,
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

    it('should reset the geometry', () => {
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
        isFullscreen: false,
        page: 1,
        reset: false,
        geometryFilter: {
          markers: [{
            marker: 'b'
          }]
        }
      });
    });
  });

  describe('FETCH_DATA_SELECTION', () => {
    const initialPayload = {
      dataset: 'bag',
      page: 1
    };

    function getReducerOutput(existingState = initialState, payload = initialPayload) {
      return reducer(existingState, {
        type: FETCH_DATA_SELECTION,
        payload
      });
    }

    it('has a default table view and set map not to be loading', () => {
      const output = getReducerOutput();

      expect(output)
        .toEqual(jasmine.objectContaining({
          view: 'TABLE'
        }));
    });

    it('can display in list view and set map to be loading', () => {
      const output = getReducerOutput(initialState, { ...initialPayload, view: 'LIST' });

      expect(output).toEqual(jasmine.objectContaining({ view: 'LIST' }));
    });

    it('can display in list view from state', () => {
      const output = getReducerOutput({ ...initialState, view: 'LIST' });

      expect(output).toEqual(jasmine.objectContaining({ view: 'LIST' }));
    });

    it('sets the dataSelection dataset, filters and page', () => {
      const output = getReducerOutput({
        ...initialState,
        filters: {
          buurtcombinatie: 'Geuzenbuurt',
          buurt: 'Trompbuurt'
        }
      }, { ...initialPayload, filter: 'filterValue' });

      expect(output)
        .toEqual(jasmine.objectContaining({
          dataset: 'bag',
          page: 1
        }));
    });

    it('sets the dataSelection dataset and page', () => {
      const output = getReducerOutput({
        ...initialState,
        filters: {
          buurtcombinatie: 'Geuzenbuurt',
          buurt: 'Trompbuurt'
        }
      });

      expect(output)
        .toEqual(jasmine.objectContaining({
          dataset: 'bag',
          page: 1
        }));
    });

    it('sets the dataSelection page, view and dataset', () => {
      const output = getReducerOutput({
        ...initialState,
        filters: {
          buurtcombinatie: 'Geuzenbuurt',
          buurt: 'Trompbuurt'
        }
      }, { ...initialPayload, emptyFilters: true });

      expect(output)
        .toEqual(jasmine.objectContaining({
          page: 1,
          view: 'TABLE',
          dataset: 'bag'
        }));
    });

    it('can reset geometry filter', () => {
      const output = getReducerOutput(initialState, {
        ...initialPayload,
        resetGeometryFilter: true
      });
      expect(output.geometryFilter)
        .toEqual({
          markers: [],
          description: ''
        });
    });

    it('makes the Array of markers empty', () => {
      const output = getReducerOutput();

      expect(output)
        .toEqual(jasmine.objectContaining({
          markers: []
        }));
    });

    it('sets isLoading to true', () => {
      const output = getReducerOutput();
      expect(output.isLoading).toBe(true);
    });
  });

  describe('SHOW_DATA_SELECTION', () => {
    const initialPayload = ['MOCKED', 'MARKER', 'ARRAY'];

    function getReducerOutput(existingState = initialState, payload = initialPayload) {
      return reducer(existingState, {
        type: SHOW_DATA_SELECTION,
        payload
      });
    }

    it('adds markers to the state', () => {
      const output = getReducerOutput();

      expect(output.markers)
        .toEqual(['MOCKED', 'MARKER', 'ARRAY']);
    });

    it('sets isLoading to false', () => {
      const output = getReducerOutput();

      expect(output.isLoading).toEqual(false);
    });

    it('does nothing if the user has navigated away from dataSelection before the API is finished', () => {
      const output = getReducerOutput(null);

      expect(output).toBeNull();
    });
  });

  describe('RESET_DATA_SELECTION', () => {
    const initialPayload = ['MOCKED', 'MARKER', 'ARRAY'];

    function getReducerOutput(existingState = initialState, payload = initialPayload) {
      return reducer(existingState, {
        type: RESET_DATA_SELECTION,
        payload
      });
    }

    it('adds markers to the state', () => {
      const output = getReducerOutput();

      expect(output.markers).toEqual(['MOCKED', 'MARKER', 'ARRAY']);
    });

    it('sets isLoading to false', () => {
      const output = getReducerOutput();

      expect(output.isLoading).toEqual(false);
    });

    it('does nothing if the user has navigated away from dataSelection before the API is finished', () => {
      const output = getReducerOutput(null);

      expect(output).toBeNull();
    });

    it('sets the reset flag to false', () => {
      const output = getReducerOutput({ ...initialState, reset: true });

      expect(output.reset)
        .toBe(false);
    });
  });

  describe('SET_DATA_SELECTION_VIEW', () => {
    const initialPayload = undefined;

    function getReducerOutput(existingState = initialState, payload = initialPayload) {
      return reducer(existingState, {
        type: SET_DATA_SELECTION_VIEW,
        payload
      });
    }

    it('can set the view to list view and set map to be loading', () => {
      const output = getReducerOutput(initialState, 'LIST');

      expect(output.view).toBe('LIST');
    });

    it('can set the view to table view and set map not to be loading', () => {
      const output = getReducerOutput(initialState, 'TABLE');

      expect(output.view).toBe('TABLE');
    });

    it('refuses to set the view to an unknown view', () => {
      const output = getReducerOutput(initialState, 'aap');

      expect(output.view).toBeUndefined();
    });

    it('sets isLoading to true', () => {
      const output = getReducerOutput({ ...initialState, isLoading: false }, 'LIST');

      expect(output.isLoading).toBe(true);
    });

    it('when dataSelection and map are not an object', () => {
      const output = getReducerOutput(null);
      expect(output).toBeNull();
    });
  });

  describe('NAVIGATE_DATA_SELECTION', () => {
    const initialPayload = undefined;

    function getReducerOutput(existingState = initialState, payload = initialPayload) {
      return reducer(existingState, {
        type: NAVIGATE_DATA_SELECTION,
        payload
      });
    }

    it('updates the page', () => {
      const output = getReducerOutput({
        ...initialState,
        dataset: 'bag',
        page: 1
      }, 4);

      expect(output)
        .toEqual(jasmine.objectContaining({
          dataset: 'bag',
          page: 4
        }));
    });

    it('when dataSelection is not an object', () => {
      const output = getReducerOutput(null, 4);
      expect(output).toBeNull();
    });
  });
});
