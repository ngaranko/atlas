import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { composeProviders } from 'redux-saga-test-plan/providers';

import watchMapClick, { switchClickAction } from './map-click';
import { getMapPanelLayers, getActiveMapLayers } from '../../ducks/panel-layers/map-panel-layers';
import { getPanorama } from '../../../shared/ducks/panorama/panorama';
import { SET_MAP_CLICK_LOCATION } from '../../ducks/map/map';
import { getMapZoom } from '../../ducks/map/map-selectors';
import { REQUEST_GEOSEARCH, REQUEST_NEAREST_DETAILS } from '../geosearch/geosearch';

describe('getActiveMapLayers', () => {
  const state = {
    map: {
      overlays: []
    }
  };
  it('should return an empty array if there are no overlays active', () => {
    const selected = getActiveMapLayers(state);
    expect(selected).toEqual([]);
  });

  it('should return an empty array if there are no overlays visible', () => {
    state.map.overlays = [state.map.overlays, { isVisible: false }];
    const selected = getActiveMapLayers(state);
    expect(selected).toEqual([]);
  });

  it('should return an empty array if there are no overlays found in the map layers', () => {
    state.map.overlays = [state.map.overlays, { id: 'id', isVisible: true }];
    state.mapLayers = { layers: { items: [] } };
    const selected = getActiveMapLayers(state);
    expect(selected).toEqual([]);
  });

  it('should return an empty array if there are no overlays found in the map layers', () => {
    state.map.overlays = [state.map.overlays, { id: 'id', isVisible: true }];
    state.mapLayers = { layers: { items: [] } };
    const selected = getActiveMapLayers(state);
    expect(selected).toEqual([]);
  });

  it('should return the maplayers that matches the id with the visible overlays', () => {
    state.map.overlays = [state.map.overlays, { id: 'id', isVisible: true }];
    state.mapLayers = { layers: { items: [{ id: 'id', detailUrl: 'url' }] } };
    const selected = getActiveMapLayers(state);
    expect(selected).toEqual([{ id: 'id', detailUrl: 'url' }]);
  });
});

describe('watchMapClick', () => {
  const action = { type: SET_MAP_CLICK_LOCATION };

  const mockMapLayers = [
    {
      id: 'kot',
      url: 'maps/brk?service=wms',
      layers: [
        'kadastraal_object',
        'kadastraal_object_label'
      ],
      detailUrl: 'geosearch/search/',
      detailItem: 'kadastraal_object',
      detailIsShape: true
    }
  ];

  const mockPanelLayers = [
    {
      category: 'Geografie: onroerende zaken',
      maxZoom: 16,
      minZoom: 8,
      legendItems: [
        { id: 'bgem', notClickable: true }
      ],
      notClickable: true,
      title: 'Kadastrale perceelsgrenzen',
      url: '/maps/brk?version=1.3.0&service=WMS'
    },
    {
      category: 'Verkeer en infrastructuur',
      id: 'pv',
      notClickable: true,
      layers: ['alle_parkeervakken'],
      legendItems: [
        {
          selectable: false,
          title: 'FISCAAL'
        }
      ],
      maxZoom: 16,
      minZoom: 10,
      title: 'Parkeervakken - Fiscale indeling',
      url: '/maps/parkeervakken?version=1.3.0&service=WMS'
    }
  ];

  const matchingPanelLayer = {
    id: 'kot',
    maxZoom: 16,
    minZoom: 8,
    legendItems: [
      { id: 'kot', notClickable: true }
    ],
    notClickable: true,
    title: 'Kadastrale perceelsgrenzen',
    url: '/maps/brk?version=1.3.0&service=WMS'
  };

  it('should watch "SET_MAP_CLICK_LOCATION" and call switchClickAction', () => {
    testSaga(watchMapClick)
      .next()
      .takeLatestEffect(SET_MAP_CLICK_LOCATION, switchClickAction)
      .next(action)
      .isDone();
  });

  describe('switchClickAction', () => {
    const payload = {
      location: {
        latitude: 52.11,
        longitude: 4.11
      }
    };

    const mapPanelLayersWithSelection = [...mockPanelLayers, matchingPanelLayer];

    const providePanorama = ({ selector }, next) => (
      selector === getPanorama ? null : next()
    );

    const provideMapLayers = ({ selector }, next) => (
      selector === getActiveMapLayers ?
        mockMapLayers : next()
    );

    const provideMapZoom = ({ selector }, next) => (
      selector === getMapZoom ? 8 : next()
    );

    it('should dispatch the REQUEST_NEAREST_DETAILS when the panorama is not enabled', () => {
      const provideMapPanelLayers = ({ selector }, next) => (
        selector === getMapPanelLayers ? mapPanelLayersWithSelection : next()
      );
      expectSaga(switchClickAction, payload)
        .provide({
          select: composeProviders(
            providePanorama,
            provideMapLayers,
            provideMapZoom,
            provideMapPanelLayers
          )
        })
        .put({
          type: REQUEST_NEAREST_DETAILS,
          payload: {
            location: payload.location,
            layers: [...mockMapLayers],
            zoom: 8
          }
        })
        .run();
    });

    it('should dispatch the REQUEST_GEOSEARCH when the panorama is not enabled and there is not panelLayer found ', () => {
      const provideMapPanelLayers = ({ selector }, next) => (
        selector === getMapPanelLayers ? [...mockPanelLayers] : next()
      );

      expectSaga(switchClickAction, payload)
        .provide({
          select: composeProviders(
            providePanorama,
            provideMapLayers,
            provideMapZoom,
            provideMapPanelLayers
          )
        })
        .put({
          type: REQUEST_GEOSEARCH,
          payload: [payload.location.latitude, payload.location.longitude]
        })
        .run();
    });
  });
});
