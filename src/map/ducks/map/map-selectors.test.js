import {
  getActiveBaseLayer,
  getCenter,
  getClusterMarkers,
  getMapCenter,
  getMapOverlays,
  getMapZoom,
  getMarkers,
  getRdGeoJsons,
  getSelectedLocation
} from './map-selectors';

import {
  getClusterMarkers as getDataSelectionClusterMarkers,
  getDataSelection
} from '../data-selection/data-selection';
import { getGeoJson as getDetailGeoJson } from '../detail/map-detail';
import { geoSearchType } from '../../components/leaflet/services/icons.constant';
import {
  getStraatbeeldLocation,
  getStraatbeeldMarkers
} from '../../../shared/ducks/straatbeeld/straatbeeld';
import { getSelectionType, SELECTION_TYPE } from '../../../shared/ducks/selection/selection';

jest.mock('../../../shared/ducks/selection/selection');
jest.mock('../data-selection/data-selection');
jest.mock('../../../shared/ducks/search/search');
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

      getClusterMarkers(state);
      expect(getDataSelectionClusterMarkers).toHaveBeenCalledWith(state);

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

  describe('getSelectedLocation', () => {
    it('should return mapClickLocation', () => {
      expect(getSelectedLocation(state)).toEqual({ lat: 123, lng: 456 });
    });
  });

  describe('getMarkers selector', () => {
    it('should return searchMarker and straatbeeldMarker data', () => {
      getDataSelection.mockImplementation(() => false);
      getStraatbeeldMarkers.mockImplementation(() => ['getStraatbeeldMarkersData']);
      selection.location = {
        latitude: 123,
        longitude: 456
      }
      expect(getMarkers({
        ...state,
        some: 'state' // force the state to change so it clears the cache
      })).toEqual([{ position: [123, 456], type: geoSearchType }, 'getStraatbeeldMarkersData']);
    });
  });
});
