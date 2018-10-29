import reducer, {
  DETAIL_FULLSCREEN, DETAIL_VIEW,
  FETCH_DETAIL,
  fetchDetail,
  SHOW_DETAIL
} from './detail';

describe('DetailReducerReducer', () => {
  const initialState = {};
  const stateAfterRequest = {
    some: 'data'
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      view: DETAIL_VIEW.MAP_DETAIL
    });
  });

  it(`should set the location when ${FETCH_DETAIL} is dispatched`, () => {
    expect(reducer(initialState, {
      type: FETCH_DETAIL,
      payload: 'payload'
    })).toEqual({
      endpoint: 'payload',
      reload: false,
      isLoading: true,
      isFullscreen: false
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
      isLoading: false,
      reload: false
    });
  });

  it(`should set the previews when ${DETAIL_FULLSCREEN} is dispatched`, () => {
    expect(reducer(stateAfterRequest, {
      type: DETAIL_FULLSCREEN,
      payload: true
    })).toEqual({
      some: 'data',
      isFullscreen: true
    });
  });
});

describe('Detail Actions', () => {
  describe('fetchDetail method', () => {
    it('should return an object with action type and payload containing an endpoint', () => {
      expect(fetchDetail('endpoint')).toEqual({
        type: FETCH_DETAIL,
        payload: 'endpoint'
      });
    });
  });
});
