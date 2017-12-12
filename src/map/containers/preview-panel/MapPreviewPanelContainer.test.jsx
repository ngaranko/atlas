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
  const initialState = {
    isMapPreviewPanelVisible: true,
    map: {
      zoom: 8,
      overlays: []
    },
    mapLayers: [],
    mapDetail: null,
    detail: null,
    search: null,
    pano: {
      previews: {}
    },
    user: { name: 'User name' }
  };
  const getSearchState = {
    ...initialState,
    search: {
      location: [1, 0],
      isLoading: true
    }
  };
  const searchState = {
    ...getSearchState,
    search: {
      location: [1, 0],
      isLoading: false
    },
    pano: {
      previews: {
        '1,0': { url: 'pano-url' }
      }
    }
  };
  const getDetailState = {
    ...searchState,
    mapDetail: {
      currentEndpoint: 'https://acc.api.data.amsterdam.nl/fake/endpoint',
      isLoading: true
    },
    detail: {
      endpoint: 'https://acc.api.data.amsterdam.nl/fake/endpoint'
    }
  };
  const detailState = {
    ...getDetailState,
    mapDetail: {
      currentEndpoint: 'https://acc.api.data.amsterdam.nl/fake/endpoint',
      isLoading: false,
      byEndpoint: {
        'https://acc.api.data.amsterdam.nl/fake/endpoint': {
          location: [1, 0]
        }
      }
    }
  };

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
    it('should not fetch anything without useful state', () => {
      const store = configureMockStore()({ ...initialState });
      jest.spyOn(store, 'dispatch');
      shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('does not fetch search results without search location', () => {
      const store = configureMockStore()({
        ...initialState,
        search: {
          isLoading: false
        }
      });
      jest.spyOn(store, 'dispatch');
      shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch actions to fetch search results and pano preview', () => {
      const store = configureMockStore()({ ...searchState });
      jest.spyOn(store, 'dispatch');
      shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).toHaveBeenCalledWith({ latitude: 1, longitude: 0 }, { name: 'User name' });
      expect(getPanoPreview).toHaveBeenCalledWith({ latitude: 1, longitude: 0 });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_MAP_SEARCH_RESULTS' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_PANO_PREVIEW' });
    });
  });

  describe('updating data', () => {
    it('should be triggered when there was no search state', () => {
      const store = configureMockStore()({ ...initialState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ searchLocation: { latitude: 1, longitude: 0 } });

      expect(getMapSearchResults).toHaveBeenCalledWith({ latitude: 1, longitude: 0 }, { name: 'User name' });
      expect(getPanoPreview).toHaveBeenCalledWith({ latitude: 1, longitude: 0 });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_MAP_SEARCH_RESULTS' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_PANO_PREVIEW' });
    });

    it('should be triggered when there was no search location', () => {
      const store = configureMockStore()({
        ...searchState,
        search: { isLoading: false }
      });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ searchLocation: { latitude: 0, longitude: 1 } });

      expect(getMapSearchResults).toHaveBeenCalledWith({ latitude: 0, longitude: 1 }, { name: 'User name' });
      expect(getPanoPreview).toHaveBeenCalledWith({ latitude: 0, longitude: 1 });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_MAP_SEARCH_RESULTS' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_PANO_PREVIEW' });
    });

    it('should be triggered when the search location changes', () => {
      const store = configureMockStore()({ ...searchState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ searchLocation: { latitude: 0, longitude: 1 } });

      expect(getMapSearchResults).toHaveBeenCalledWith({ latitude: 0, longitude: 1 }, { name: 'User name' });
      expect(getPanoPreview).toHaveBeenCalledWith({ latitude: 0, longitude: 1 });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_MAP_SEARCH_RESULTS' });
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_PANO_PREVIEW' });
    });
  });

  describe('rendering', () => {
    it('should render results', () => {
      const store = configureMockStore()({ ...searchState });
      selectLatestMapSearchResults.mockImplementation(() => [{ item: 1 }, { item: 2 }]);

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();

      // Update results
      wrapper.setProps({ results: [{ item: 3 }] });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render results without pano', () => {
      const store = configureMockStore()({
        ...searchState,
        pano: {
          ...searchState.pano,
          previews: {}
        }
      });
      selectLatestMapSearchResults.mockImplementation(() => [{ item: 1 }, { item: 2 }]);

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();

      // Set pano
      wrapper.setProps({ pano: { ...searchState.pano } });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render empty results', () => {
      const store = configureMockStore()({ ...searchState });
      selectLatestMapSearchResults.mockImplementation(() => []);

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();

      // Update results
      wrapper.setProps({ results: [{ item: 3 }] });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render visibility', () => {
      const store = configureMockStore()({ ...searchState });
      selectLatestMapSearchResults.mockImplementation(() => [{ item: 3 }]);

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      wrapper.setProps({ isMapPreviewPanelVisible: false });
      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({ isMapPreviewPanelVisible: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render loading', () => {
      const store = configureMockStore()({ ...searchState });
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      wrapper.setProps({ search: { isLoading: true } });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should maximize the preview panel', () => {
    const store = configureMockStore()(searchState);
    jest.spyOn(store, 'dispatch');
    const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
    wrapper.find('.map-preview-panel__button').at(0).simulate('click');

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'MAXIMIZE_MAP_PREVIEW_PANEL' });
  });

  it('should close the preview panel', () => {
    const store = configureMockStore()(searchState);
    jest.spyOn(store, 'dispatch');
    const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
    wrapper.find('.map-preview-panel__button').at(1).simulate('click');

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'CLOSE_MAP_PREVIEW_PANEL' });
  });
});
