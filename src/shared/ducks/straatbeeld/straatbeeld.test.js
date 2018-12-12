import reducer, { setStraatbeeldOff, STRAATBEELD_OFF } from './straatbeeld';

describe('Straatbeeld Reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  it('should set the initial state', () => {
    expect(state).toEqual({
      date: null,
      fov: 0,
      heading: 0,
      history: {
        label: 'Meest recent',
        layerName: 'pano',
        missionType: '',
        year: 0
      },
      hotspots: [],
      image: null,
      isFullscreen: false,
      isInitial: true,
      isLoading: true,
      location: null,
      pitch: 0
    });
  });

  it(`should set the state to null when ${STRAATBEELD_OFF} is dispatched`, () => {
    expect(reducer(state, setStraatbeeldOff())).toEqual(null);
  });
});
