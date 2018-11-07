import {
  getActiveBaseLayer,
  getCenter,
  getMapCenter,
  getMapOverlays,
  getMapZoom,
  getRdGeoJsons
} from './map-selectors';
import { getGeoJson as getDetailGeoJson } from '../detail/map-detail';
import { getStraatbeeldLocation } from '../../../shared/ducks/straatbeeld/straatbeeld';
import { getSelectionType, SELECTION_TYPE } from '../../../shared/ducks/selection/selection';

jest.mock('../../../shared/ducks/selection/selection');
jest.mock('../../../shared/ducks/data-search/data-search');
jest.mock('../../../shared/ducks/straatbeeld/straatbeeld');
jest.mock('../detail/map-detail');
describe('Map Selectors', () => {
  const map = {
    baseLayer: 'baseLayer',
    viewCenter: true,
    overlays: [{ overlay: '' }],
    zoom: 2,
    selectedLocation: '123,456'
  };
  const straatbeeld = {
    location: 'sss'
  };
  const selection = {};

  const state = {
    map,
    straatbeeld,
    selection
  };

  describe('simple selectors', () => {
    it('should return the proper result', () => {
      expect(getActiveBaseLayer(state)).toEqual(map.baseLayer);
      expect(getMapZoom(state)).toEqual(map.zoom);
      expect(getMapCenter(state)).toEqual(map.viewCenter);

      getRdGeoJsons(state);
      expect(getDetailGeoJson).toHaveBeenCalledWith(state);
    });
  });

  describe('getMapOverlays', () => {
    it('should return selected layers', () => {
      getSelectionType.mockImplementation(() => SELECTION_TYPE.NONE);
      expect(getMapOverlays({
        ...state,
        some: 'state' // force the state to change so it clears the cache
      })).toEqual(map.overlays);
    });

    it('should add pano layer if selection type is panorama', () => {
      getSelectionType.mockImplementation(() => SELECTION_TYPE.PANORAMA);
      expect(getMapOverlays({
        ...state,
        some: 'state' // force the state to change so it clears the cache
      })).toEqual([
        ...map.overlays,
        { id: 'pano', isVisible: true }
      ]);
    });
  });

  describe('getCenter selector', () => {
    beforeEach(() => {
      getCenter.resetRecomputations();
    });

    it('should return the state', () => {
      expect(getCenter(state)).toEqual(map.viewCenter);
    });

    it('should return straatbeeldLocation when it\'s defined', () => {
      getStraatbeeldLocation.mockImplementation(() => 'straatbeeld location');
      expect(getCenter({
        ...state,
        some: 'state' // force the state to change so it clears the cache
      })).toEqual('straatbeeld location');
    });
  });
});
