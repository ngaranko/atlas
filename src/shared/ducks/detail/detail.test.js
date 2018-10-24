import reducer, {
  DETAIL_FULLSCREEN, DETAIL_VIEW,
  FETCH_DETAIL,
  fetchDetail,
  setDetailEndpointRoute,
  SHOW_DETAIL
} from './detail';

describe('DetailReducer', () => {
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
      isLoading: true,
      isFullscreen: false,
      skippedSearchResults: false
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

  describe('setDetailEndpointRoute action', () => {
    it('should return an object with action type and payload containing an endpoint', () => {
      expect(setDetailEndpointRoute('endpoint')).toEqual({
        type: 'UPDATE_MAP',
        payload: {
          noRedirect: true,
          route: 'atlasRouter/KAART',
          query: {
            detailEndpoint: 'endpoint'
          }
        }
      });
    });
  });
});
