import React from 'react';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { mount, shallow, render } from 'enzyme';
import createSagaMiddleware from 'redux-saga';

import LeafletContainer from './LeafletContainer';
import leafletContainerMock from './LeafletContainer.integration.mock';

// import watchFetchMapDetail from '../../sagas/detail';
// import watchGeoSearchRequest from '../../sagas/geosearch';
import watchFetchMapBaseLayers from '../../sagas/map-base-layers';
// import watchMapClick from '../../sagas/map-click';
// import watchFetchMapLayers from '../../sagas/map-layers';
// import watchFetchMapPanelLayers from '../../sagas/map-panel-layers';
// import watchFetchNearestDetails from '../../sagas/nearest-details';
// import watchFetchMapSearchResults from '../../sagas/search-results';

import { getMapBaseLayers, getPanelLayers, getMapLayers } from '../../services';
import MapLeaflet from '../../components/leaflet/MapLeaflet';

import rootSaga from '../../../root-saga';

import BaseLayerReducer from '../../ducks/base-layers/map-base-layers';
import ClickLocationReducer from '../../ducks/click-location/map-click-location';
import MapDetailReducer from '../../ducks/detail/map-detail';
import MapLayersReducer from '../../ducks/layers/map-layers';
import MapReducer from '../../ducks/map/map';
import PanelLayersReducer from '../../ducks/panel-layers/map-panel-layers';
import MapSearchResultsReducer from '../../ducks/search-results/map-search-results';

import UiReducer from '../../../shared/ducks/ui/ui';
import UserReducer from '../../../reducers/user';


// mock authentication call, as this is not part of this test scope
jest.mock('../../../shared/services/auth/auth');

// getMapBaseLayers.default = jest.fn();
// getMapLayers.default = jest.fn();
// getPanelLayers.default = jest.fn();

// In the code several reducers are combined, resulting in a "key: reducer" structure
// to make sure the state is as much as the running app, we put this one reducer in the same
// structure with the combineReducers

const mapLayersReducer = combineReducers({
  layers: MapLayersReducer,
  baseLayers: BaseLayerReducer,
  panelLayers: PanelLayersReducer
});

const mainReducer = combineReducers({
  mapClickLocation: ClickLocationReducer,
  mapDetail: MapDetailReducer,
  mapSearchResultsByLocation: MapSearchResultsReducer,
  user: UserReducer,
  ui: UiReducer,
  map: MapReducer,
  mapLayers: mapLayersReducer
});

let store;
let enhancer;

getMapBaseLayers.default = jest.fn(() => Promise.resolve(leafletContainerMock.mapBaseLayers));
getPanelLayers.default = jest.fn(() => Promise.resolve(leafletContainerMock.mapPanelLayers));
getMapLayers.default = jest.fn(() => Promise.resolve(leafletContainerMock.mapLayers));

describe('leafletContainer', () => {
  beforeEach(async () => {
    global._paq = [];
    // create real store with saga. The code does not seem to update a mock-store correctly
    const sagaMiddleware = createSagaMiddleware();
    enhancer = compose(
      applyMiddleware(sagaMiddleware)
    );
    store = createStore(mainReducer, {}, enhancer);
    // Only run the saga which is in scope for this test
    sagaMiddleware.run(rootSaga);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render MapLeaflet before the mapLayers are in the state', () => {
    const leafletContainer = mount(<LeafletContainer getLeafletInstance={() => ''} />, { context: { store } });
    expect(store.getState()).toMatchSnapshot();
    expect(leafletContainer).toMatchSnapshot();
  });

  it('should not render MapLeaflet if the mapLayers are not in the state', async () => {
    const leafletContainer = mount(<LeafletContainer getLeafletInstance={() => ''} />, { context: { store } });
    const mapBaseLayers = await getMapBaseLayers();
    expect(mapBaseLayers).toEqual(store.getState().mapLayers.baseLayers.items);
    const mapPanelLayers = await getPanelLayers();
    expect(mapPanelLayers).toEqual(store.getState().mapLayers.panelLayers.items);
    const mapLayers = await getMapLayers();
    expect(mapLayers).toEqual(store.getState().mapLayers.layers.items);
    expect(store.getState()).toMatchSnapshot();
    leafletContainer.update();
    expect(leafletContainer).toMatchSnapshot();
  });

  it('should add the mapLayers data to the right state', async () => {
    mount(<LeafletContainer getLeafletInstance={() => ''} />, { context: { store } });
    const mapBaseLayers = await getMapBaseLayers();
    expect(mapBaseLayers).toEqual(store.getState().mapLayers.baseLayers.items);
    const mapPanelLayers = await getPanelLayers();
    expect(mapPanelLayers).toEqual(store.getState().mapLayers.panelLayers.items);
    const mapLayers = await getMapLayers();
    expect(mapLayers).toEqual(store.getState().mapLayers.layers.items);
  });

  it('should render MapLeaflet if the mapLayers are in the state', async () => {
    const leafletContainer = mount(<LeafletContainer getLeafletInstance={() => ''} />, { context: { store } });
    await getMapBaseLayers();
    expect(store.getState()).toMatchSnapshot();
    leafletContainer.update();
    expect(leafletContainer).toMatchSnapshot();
    leafletContainer.update();
    const wrapper = leafletContainer.find('MapLeaflet').ref('activeElement');
    expect(wrapper);
  });
});
