import reducer from './reducer';
import {
  getDetail,
  getDetailGeometry,
  getDetailDisplay,
  isDetailLoading
} from './selectors';
import { CLEAR_MAP_DETAIL, SHOW_DETAIL } from './constants';
import { clearMapDetail } from './actions';

describe('DetailReducer', () => {
  const initialState = {};
  const stateAfterRequest = {
    some: 'data'
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isLoading: false
    });
  });

  it(`should set the location when ${CLEAR_MAP_DETAIL} is dispatched`, () => {
    expect(reducer(initialState, {
      type: CLEAR_MAP_DETAIL,
      payload: 'payload'
    })).toEqual({
      isLoading: true
    });
  });

  it(`should set the detail data when ${SHOW_DETAIL} is dispatched`, () => {
    expect(reducer(stateAfterRequest, {
      type: SHOW_DETAIL,
      payload: {
        display: 'display',
        geometry: 'geometry'
      }
    })).toEqual({
      some: 'data',
      display: 'display',
      geometry: 'geometry',
      isLoading: false
    });
  });
});

describe('Detail Actions', () => {
  describe('clearMapDetail method', () => {
    it('should return an object with action type and payload containing an endpoint', () => {
      expect(clearMapDetail('endpoint')).toEqual({
        type: CLEAR_MAP_DETAIL,
        payload: 'endpoint'
      });
    });
  });
});

describe('Detail Selectors', () => {
  const initialState = reducer(undefined, {});

  it('should return detail information from the state', () => {
    expect(getDetail({ detail: initialState })).toEqual(initialState);
    expect(getDetailGeometry({ detail: initialState })).toEqual(initialState.geometry);
    expect(getDetailDisplay({ detail: initialState })).toEqual(initialState.display);
    expect(isDetailLoading({ detail: initialState })).toEqual(initialState.isLoading);
  });
});
