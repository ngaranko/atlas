import reducer, {
  CLOSE_MAP_PREVIEW_PANEL,
  closeMapPreviewPanel,
  fetchSearchResultsByLocation,
  OPEN_MAP_PREVIEW_PANEL,
  showDetailView,
  showSearchView
} from './map-preview-panel';
import { FETCH_SEARCH_RESULTS_BY_LOCATION } from '../../../shared/ducks/search/search';

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

  it('should return the proper action when calling fetchSearchResultsByLocation', () => {
    const location = {
      latitude: 123,
      longitude: 321
    };
    expect(fetchSearchResultsByLocation(location)).toEqual({
      type: FETCH_SEARCH_RESULTS_BY_LOCATION,
      payload: [location.latitude, location.longitude]
    });
  });

  it('should return the proper action when calling showDetailView', () => {
    expect(showDetailView()).toEqual({
      payload: {
        noRedirect: true,
        route: 'atlasRouter/KAART_DETAIL'
      },
      type: 'UPDATE_MAP'
    });
  });

  it('should return the proper action when calling showSearchView', () => {
    expect(showSearchView()).toEqual({
      payload: {
        noRedirect: true,
        route: 'atlasRouter/KAART_SEARCH'
      },
      type: 'UPDATE_MAP'
    });
  });
});
