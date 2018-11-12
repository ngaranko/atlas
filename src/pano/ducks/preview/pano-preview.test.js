import reducer, {
  FETCH_PANO_PREVIEW_REQUEST,
  fetchPanoPreview, fetchPanoPreviewFailure, fetchPanoPreviewSuccess
} from './pano-preview';

const initialState = {
  isLoading: false,
  error: undefined,
  preview: undefined
};


describe('FetchPanoPreview Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set the previews', () => {
    expect(reducer(initialState, fetchPanoPreviewSuccess('somePanoResult'))
    ).toEqual({
      ...initialState,
      isLoading: false,
      preview: 'somePanoResult'
    });
  });

  it('should set an error when failure is dispatched', () => {
    expect(reducer(initialState, fetchPanoPreviewFailure('Some error message')))
      .toEqual({
        ...initialState,
        error: 'Some error message',
        isLoading: false
      });
  });
});

describe('getPanoPreview method', () => {
  it('should return an object with action type and location', () => {
    expect(fetchPanoPreview('some location')).toEqual({
      type: FETCH_PANO_PREVIEW_REQUEST,
      payload: 'some location'
    });
  });
});
