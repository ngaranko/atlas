import reducer, {
  FETCH_PANO_PREVIEW_FAILURE,
  FETCH_PANO_PREVIEW_REQUEST,
  FETCH_PANO_PREVIEW_SUCCESS,
  fetchPanoPreview
} from './pano-preview';

const initialState = {
  error: null,
  location: {},
  previews: {}
};

const stateAfterRequest = {
  error: null,
  location: {
    locationOne: 'xx'
  },
  previews: {}
};

describe('FetchPanoPreview Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should set the location when ${FETCH_PANO_PREVIEW_REQUEST} is dispatched`, () => {
    expect(reducer(initialState, {
      type: FETCH_PANO_PREVIEW_REQUEST,
      location: {
        locationOne: 'xx'
      }
    })).toEqual({
      error: null,
      location: {
        locationOne: 'xx'
      },
      previews: {}
    });
  });

  it(`should set the panoResult when ${FETCH_PANO_PREVIEW_SUCCESS} is dispatched`, () => {
    expect(reducer(stateAfterRequest, {
      type: FETCH_PANO_PREVIEW_SUCCESS,
      panoResult: 'somePanoResult'
    })).toEqual({
      error: null,
      location: {
        locationOne: 'xx'
      },
      previews: {
        xx: 'somePanoResult'
      }
    });
  });

  it(`should set the previews when ${FETCH_PANO_PREVIEW_SUCCESS} is dispatched`, () => {
    expect(reducer({
      ...stateAfterRequest,
      location: {
        locationOne: 'xx',
        locationTwo: 'yy'
      }
    }, {
      type: FETCH_PANO_PREVIEW_SUCCESS,
      panoResult: 'somePanoResult'
    })).toEqual({
      error: null,
      location: {
        locationOne: 'xx',
        locationTwo: 'yy'
      },
      previews: {
        'xx,yy': 'somePanoResult'
      }
    });
  });

  it(`should set an error when ${FETCH_PANO_PREVIEW_FAILURE} is dispatched`, () => {
    expect(reducer(stateAfterRequest, {
      type: FETCH_PANO_PREVIEW_FAILURE,
      error: 'Some error message'
    })).toEqual({
      ...stateAfterRequest,
      error: 'Some error message'
    });
  });
});

describe('getPanoPreview method', () => {
  it('should return an object with action type and location', () => {
    expect(fetchPanoPreview('some location')).toEqual({
      type: FETCH_PANO_PREVIEW_REQUEST,
      location: 'some location'
    });
  });
});
