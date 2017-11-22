import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import MapPreviewPanelContainer from './MapPreviewPanelContainer';
import { selectLatestMapSearchResults, getMapSearchResults }
  from '../../ducks/search-results/map-search-results';
import { getPanoPreview } from '../../../pano/ducks/preview/pano-preview';
import MapLayers from '../../components/layers/MapLayers';
import MapLegend from '../../components/legend/MapLegend';
import MapType from '../../components/type/MapType';

jest.mock('../../ducks/search-results/map-search-results');
jest.mock('../../../pano/ducks/preview/pano-preview');

describe('MapPreviewPanelContainer', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    getMapSearchResults.mockImplementation(() => ({ type: 'GET_MAP_SEARCH_RESULTS' }));
    getPanoPreview.mockImplementation(() => ({ type: 'GET_PANO_PREVIEW' }));
  });

  afterEach(() => {
    getMapSearchResults.mockReset();
    getPanoPreview.mockReset();
  });

  describe('fetching initial data', () => {
    it('should dispatch actions to fetch search results and pano preview', () => {
      store = configureMockStore()({
        search: {
          location: [1, 0],
          isLoading: false
        },
        pano: {
          previews: {}
        },
        user: { name: 'User name' }
      });
      jest.spyOn(store, 'dispatch');
      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).toHaveBeenCalledWith([1, 0], { name: 'User name' });
      expect(getPanoPreview).toHaveBeenCalledWith([1, 0]);
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_MAP_SEARCH_RESULTS' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_PANO_PREVIEW' });
    });

    it('does not fetch data without search location', () => {
      store = configureMockStore()({
        search: {
          isLoading: false
        },
        pano: {
          previews: {}
        },
        user: { name: 'User name' }
      });
      jest.spyOn(store, 'dispatch');
      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();

      // Again without a search object
      store = configureMockStore()({
        pano: {
          previews: {}
        },
        user: { name: 'User name' }
      });
      jest.spyOn(store, 'dispatch');
      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  xit('should render MapType and MapLayers', () => {
    expect(wrapper.find(MapType).length).toBe(1);
    expect(wrapper.find(MapLayers).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  xit('should render MapLegend if store contains active map layers', () => {
    expect(wrapper.find(MapLegend).length).toBe(0);
    wrapper.setProps({ activeMapLayers: [{}] });
    expect(wrapper.find(MapLegend).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
