import {
  getActiveBaseLayer,
  getCenter,
  getClusterMarkers,
  getMapCenter,
  getMapOverlays,
  getMapZoom,
  getMarkers,
  getRdGeoJsons
} from './map-selectors';

import {
  getClusterMarkers as getDataSelectionClusterMarkers,
  getDataSelection,
  getMarkers as getDataSelectionMarkers
} from '../data-selection/data-selection';
import { getSearchMarker } from '../search-results/map-search-results';
import { getStraatbeeldLocation, getStraatbeeldMarkers } from '../straatbeeld/straatbeeld';
import { getGeoJson as getDetailGeoJson } from '../detail/map-detail';

jest.mock('../data-selection/data-selection');
jest.mock('../search-results/map-search-results');
jest.mock('../straatbeeld/straatbeeld');
jest.mock('../detail/map-detail');
describe('Map Selectors', () => {
  const map = {
    baseLayer: 'baseLayer',
    viewCenter: true,
    overlays: [{ overlay: '' }],
    zoom: 2
  };
  const straatbeeld = {
    location: 'sss'
  };

  const state = {
    map,
    straatbeeld
  };

  describe('simple selectors', () => {
    it('should return the proper result', () => {
      expect(getActiveBaseLayer(state)).toEqual(map.baseLayer);
      expect(getMapZoom(state)).toEqual(map.zoom);
      expect(getMapOverlays(state)).toEqual(map.overlays);
      expect(getMapCenter(state)).toEqual(map.viewCenter);

      getClusterMarkers(state);
      expect(getDataSelectionClusterMarkers).toHaveBeenCalledWith(state);

      getRdGeoJsons(state);
      expect(getDetailGeoJson).toHaveBeenCalledWith(state);
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

  describe('getMarkers selector', () => {
    it('should call getDataSelectionMarkers when dataSelection is true', () => {
      getDataSelection.mockImplementation(() => true);
      getDataSelectionMarkers.mockImplementation(() => ({}));
      expect(getMarkers(state)).toEqual({});
    });

    it('should return searchMarker and straatbeeldMarker data', () => {
      getDataSelection.mockImplementation(() => false);
      getSearchMarker.mockImplementation(() => ['getSearchMarkerData']);
      getStraatbeeldMarkers.mockImplementation(() => ['getStraatbeeldMarkersData']);
      expect(getMarkers({
        ...state,
        some: 'state' // force the state to change so it clears the cache
      })).toEqual(['getSearchMarkerData', 'getStraatbeeldMarkersData']);
    });
  });
});
