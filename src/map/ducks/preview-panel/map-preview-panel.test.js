import reducer, {
  CLOSE_MAP_PREVIEW_PANEL,
  closeMapPreviewPanel,
  fetchSearchResultsByLocation,
  OPEN_MAP_PREVIEW_PANEL
} from './map-preview-panel';
import { FETCH_SEARCH_RESULTS_BY_LOCATION } from '../../../shared/ducks/data-search/data-search';

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
});
