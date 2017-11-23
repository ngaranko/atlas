import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import MapPreviewPanelContainer from './MapPreviewPanelContainer';
import { selectLatestMapSearchResults, getMapSearchResults }
  from '../../ducks/search-results/map-search-results';
import { getPanoPreview } from '../../../pano/ducks/preview/pano-preview';

jest.mock('../../ducks/search-results/map-search-results');
jest.mock('../../../pano/ducks/preview/pano-preview');

describe('MapPreviewPanelContainer', () => {
  const defaultMockState = {
    isMapPreviewPanelVisible: true,
    search: {
      location: [1, 0],
      isLoading: false
    },
    pano: {
      previews: {
        '1,0': { url: 'pano-url' }
      }
    },
    user: { name: 'User name' }
  };
  const defaultMockStateNoSearch = {
    isMapPreviewPanelVisible: true,
    pano: {
      previews: {}
    },
    user: { name: 'User name' }
  };

  let store;
  let wrapper;

  beforeEach(() => {
    getMapSearchResults.mockImplementation(() => ({ type: 'GET_MAP_SEARCH_RESULTS' }));
    getPanoPreview.mockImplementation(() => ({ type: 'GET_PANO_PREVIEW' }));
  });

  afterEach(() => {
    getMapSearchResults.mockReset();
    getPanoPreview.mockReset();
    selectLatestMapSearchResults.mockReset();
  });

  describe('fetching initial data', () => {
    it('should dispatch actions to fetch search results and pano preview', () => {
      store = configureMockStore()({ ...defaultMockState });
      jest.spyOn(store, 'dispatch');
      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).toHaveBeenCalledWith([1, 0], { name: 'User name' });
      expect(getPanoPreview).toHaveBeenCalledWith([1, 0]);
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_MAP_SEARCH_RESULTS' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_PANO_PREVIEW' });
    });

    it('does not fetch data without search location', () => {
      store = configureMockStore()({
        ...defaultMockState,
        search: {
          isLoading: false
        }
      });
      jest.spyOn(store, 'dispatch');
      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();

      // Again without a search object
      store = configureMockStore()({ ...defaultMockStateNoSearch });
      jest.spyOn(store, 'dispatch');
      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('updating data', () => {
    it('should be triggered when there was no search state', () => {
      store = configureMockStore()({ ...defaultMockStateNoSearch });
      jest.spyOn(store, 'dispatch');
      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ search: { location: [1, 0] } });

      expect(getMapSearchResults).toHaveBeenCalledWith([1, 0], { name: 'User name' });
      expect(getPanoPreview).toHaveBeenCalledWith([1, 0]);
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_MAP_SEARCH_RESULTS' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_PANO_PREVIEW' });
    });

    it('should be triggered when there was no search location', () => {
      store = configureMockStore()({
        ...defaultMockState,
        search: { isLoading: false }
      });
      jest.spyOn(store, 'dispatch');
      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ search: { location: [0, 1] } });

      expect(getMapSearchResults).toHaveBeenCalledWith([0, 1], { name: 'User name' });
      expect(getPanoPreview).toHaveBeenCalledWith([0, 1]);
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_MAP_SEARCH_RESULTS' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_PANO_PREVIEW' });
    });

    it('should be triggered when the search location changes', () => {
      store = configureMockStore()({ ...defaultMockState });
      jest.spyOn(store, 'dispatch');
      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ search: { location: [0, 1] } });

      expect(getMapSearchResults).toHaveBeenCalledWith([0, 1], { name: 'User name' });
      expect(getPanoPreview).toHaveBeenCalledWith([0, 1]);
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_MAP_SEARCH_RESULTS' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_PANO_PREVIEW' });
    });
  });

  describe('rendering', () => {
    it('should render results', () => {
      store = configureMockStore()({
        isMapPreviewPanelVisible: true,
        search: {
          location: [1, 0],
          isLoading: false
        },
        pano: {
          previews: {
            '1,0': { url: 'pano-url' }
          }
        },
        user: { name: 'User name' }
      });
      selectLatestMapSearchResults.mockImplementation(() => [{ item: 1 }, { item: 2 }]);

      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();

      // Update results
      wrapper.setProps({ results: [{ item: 3 }] });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render results without pano', () => {
      store = configureMockStore()({
        isMapPreviewPanelVisible: true,
        search: {
          location: [1, 0],
          isLoading: false
        },
        pano: {
          previews: {}
        },
        user: { name: 'User name' }
      });
      selectLatestMapSearchResults.mockImplementation(() => [{ item: 1 }, { item: 2 }]);

      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();

      // Set pano
      wrapper.setProps({
        pano: {
          previews: {
            '1,0': { url: 'pano-url' }
          }
        }
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render empty results', () => {
      store = configureMockStore()({
        isMapPreviewPanelVisible: true,
        search: {
          location: [1, 0],
          isLoading: false
        },
        pano: {
          previews: {
            '1,0': { url: 'pano-url' }
          }
        },
        user: { name: 'User name' }
      });
      selectLatestMapSearchResults.mockImplementation(() => []);

      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();

      // Update results
      wrapper.setProps({ results: [{ item: 3 }] });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render visibility', () => {
      store = configureMockStore()({
        isMapPreviewPanelVisible: true,
        search: {
          location: [1, 0],
          isLoading: false
        },
        pano: {
          previews: {
            '1,0': { url: 'pano-url' }
          }
        },
        user: { name: 'User name' }
      });

      wrapper.setProps({ isMapPreviewPanelVisible: false });
      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({ isMapPreviewPanelVisible: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render loading', () => {
      store = configureMockStore()({ ...defaultMockState });
      wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      wrapper.setProps({ search: { isLoading: true } });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
