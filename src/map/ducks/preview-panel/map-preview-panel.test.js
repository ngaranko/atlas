import reducer, {
  CLOSE_MAP_PREVIEW_PANEL,
  closeMapPreviewPanel,
  fetchSearchResults,
  OPEN_MAP_PREVIEW_PANEL,
  showDetailView,
  showSearchView
} from './map-preview-panel';
import { FETCH_SEARCH_RESULTS_BY_LOCATION } from '../../../shared/actions';
import { routing } from '../../../app/routes';
import { UPDATE_MAP } from '../map/map';

const initialState = {};
describe('map preview reducer and actions', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should handle ${OPEN_MAP_PREVIEW_PANEL}`, () => {
    expect(reducer({}, {
      type: OPEN_MAP_PREVIEW_PANEL
    })).toEqual({
      isMapPreviewPanelVisible: true
    });
  });

  it(`should handle ${CLOSE_MAP_PREVIEW_PANEL}`, () => {
    expect(reducer({}, closeMapPreviewPanel())).toEqual({
      isMapPreviewPanelVisible: false
    });
  });

  describe('fetchSearchResults action', () => {
    it('should return the proper action', () => {
      const location = {
        latitude: 123,
        longitude: 321
      };
      expect(fetchSearchResults(location)).toEqual({
        type: FETCH_SEARCH_RESULTS_BY_LOCATION,
        payload: [location.latitude, location.longitude]
      });
    });
  });

  describe('showDetailView action', () => {
    it('should return the proper action', () => {
      expect(showDetailView()).toEqual({
        payload: {
          noRedirect: true,
          route: routing.detail.type
        },
        type: UPDATE_MAP
      });
    });
  });

  describe('showSearchView action', () => {
    it('should return the proper action', () => {
      expect(showSearchView()).toEqual({
        payload: {
          noRedirect: true,
          route: routing.mapSearch.type
        },
        type: UPDATE_MAP
      });
    });
  });
});
