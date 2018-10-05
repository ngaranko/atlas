import ACTIONS from '../../shared/actions';
import straatbeeldReducers from './straatbeeld-reducers';
import * as STRAATBEELD_CONFIG from '../../../modules/straatbeeld/straatbeeld-config';

describe('Straatbeeld reducers factory', () => {
  let defaultState;

  beforeAll(() => {
    STRAATBEELD_CONFIG.default = {
      DEFAULT_FOV: 79
    };
  });

  beforeEach(() => {
    // eslint-disable-next-line max-len
    // TODO: Note: before each required because somewhere in the reducer the map.viewCenter is mutated (not pure function).
    // Not fixing it with this refactor step.
    defaultState = {
      map: {
        baseLayer: 'topografie',
        overlays: [],
        viewCenter: [52.3719, 4.9012],
        zoom: 9,
        isLoading: false
      },
      search: null,
      page: {
        name: 'home'
      },
      detail: null,
      straatbeeld: null,
      dataSelection: null,
      ui: {
        isMapFullscreen: false,
        isMapPanelVisible: false,
        isPrintMode: false
      }
    };
  });

  describe('FETCH_STRAATBEELD_BY_ID', () => {
    let payload;

    beforeEach(() => {
      payload = {
        id: 'ABC',
        heading: 123,
        isInitial: true
      };
    });

    it('resets search results', () => {
      const inputState = {
        ...defaultState,
        search: {
          query: 'linnaeus'
        }
      };

      const output = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_ID](inputState, payload);
      expect(output.search).toBeNull();
    });
  });

  describe('SHOW_STRAATBEELD', () => {
    const payload = {
      date: new Date('2016-05-19T13:04:15.341110Z'),
      hotspots: [{
        id: 'ABC',
        heading: 179,
        distance: 3
      }],
      location: [52, 4],
      image: {
        pattern: 'http://example.com/example/{this}/{that}/{whatever}.png',
        preview: 'http://example.com/example/preview.png'
      }
    };

    let inputState;
    beforeEach(() => {
      inputState = {
        ...defaultState,
        straatbeeld: {
          isLoading: true,
          id: 'ABC',
          heading: 123,
          isInitial: true
        },
        detail: null
      };
    });

    it('sets viewcenter when no heading is known', () => {
      inputState.straatbeeld.heading = null;
      inputState.map = {};

      const output = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
      expect(output.map.viewCenter).toEqual(payload.location);
    });

    it('centers the map when fullscreen map is active', () => {
      const state = {
        page: {},
        map: {},
        ui: {
          isMapPanelVisible: false,
          isMapFullscreen: true
        }
      };
      const location = [52.001, 4.002];

      const output = straatbeeldReducers[ACTIONS.FETCH_STRAATBEELD_BY_LOCATION](state, location);
      expect(output.map.viewCenter).toEqual(location);
    });

    it('sets the map viewcenter on first and every subsequent straatbeeld', () => {
      inputState.map.viewCenter = null;
      let output;

      payload.location = [5, 6];
      output = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_INITIAL](inputState, payload);
      expect(output.map.viewCenter).toEqual([5, 6]);

      payload.location = [3, 4];
      output = straatbeeldReducers[ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT](inputState, payload);
      expect(output.map.viewCenter).toEqual([3, 4]);
    });
  });
});
