// NOTE!!! Testing both container and component.
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import MapPreviewPanelContainer from './MapPreviewPanelContainer';
import {
  FETCH_MAP_SEARCH_RESULTS_REQUEST,
  getMapSearchResults
} from '../../../shared/ducks/data-search/data-search';
import { selectNotClickableVisibleMapLayers } from '../../ducks/panel-layers/map-panel-layers';
import {
  FETCH_MAP_DETAIL_REQUEST,
  getMapDetail,
  selectLatestMapDetail
} from '../../ducks/detail/map-detail';
import {
  FETCH_PANO_PREVIEW_REQUEST,
  getPanoPreview
} from '../../../pano/ducks/preview/pano-preview';
import {
  getLocationId,
  getSelectedLocation,
  getShortSelectedLocation,
  selectLatestMapSearchResults
} from '../../ducks/map/map-selectors';
import { getDetailEndpoint } from '../../../shared/ducks/detail/detail';
import { toMap, toPanorama } from '../../../app/routes';
import { isGeoSearch } from '../../../shared/ducks/selection/selection';

jest.mock('../../../shared/ducks/detail/detail');
jest.mock('../../../shared/ducks/data-search/data-search');
jest.mock('../../ducks/panel-layers/map-panel-layers');
jest.mock('../../ducks/detail/map-detail');
jest.mock('../../ducks/map/map-selectors');
jest.mock('../../../pano/ducks/preview/pano-preview');
jest.mock('../../../shared/ducks/selection/selection');

jest.mock('../../../shared/services/piwik-tracker/piwik-tracker');

describe('MapPreviewPanelContainer', () => {
  const initialState = {
    map: {
      zoom: 8,
      overlays: [],
      selectedLocation: '1,2'
    },
    mapLayers: {
      layers: {
        items: []
      },
      baseLayers: {
        items: []
      },
      panelLayers: {
        items: []
      }
    },
    selection: {
      type: 'MAP',
      location: {
        latitude: '11',
        longitude: '11'
      }
    },
    mapDetail: null,
    detail: null,
    search: null,
    ui: {},
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
    getMapSearchResults.mockImplementation(() => ({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST }));
    getMapDetail.mockImplementation(() => ({ type: FETCH_MAP_DETAIL_REQUEST }));
    getPanoPreview.mockImplementation(() => ({ type: FETCH_PANO_PREVIEW_REQUEST }));
    selectNotClickableVisibleMapLayers.mockImplementation(() => ([]));
    getShortSelectedLocation.mockImplementation(() => null);
    isGeoSearch.mockImplementation((state) => !(state.detail && state.detail.endpoint));
    getDetailEndpoint.mockImplementation((state) => state.detail && state.detail.endpoint);
  });

  afterEach(() => {
    getMapSearchResults.mockReset();
    getMapDetail.mockReset();
    getPanoPreview.mockReset();
    selectLatestMapSearchResults.mockReset();
    selectLatestMapDetail.mockReset();
    selectNotClickableVisibleMapLayers.mockReset();
  });

  describe('fetching initial data', () => {
    it('should not fetch anything without useful state', () => {
      const store = configureMockStore()({ ...initialState });
      jest.spyOn(store, 'dispatch');
      shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getMapDetail).not.toHaveBeenCalled();
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
      expect(getMapDetail).not.toHaveBeenCalled();
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch actions to fetch search results and pano preview', () => {
      const store = configureMockStore()({ ...searchState });
      getShortSelectedLocation.mockImplementation(() => ({
        longitude: 0,
        latitude: 1
      }));
      jest.spyOn(store, 'dispatch');
      shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).toHaveBeenCalledWith({
        latitude: 1,
        longitude: 0
      }, { name: 'User name' });
      expect(getMapDetail).not.toHaveBeenCalled();
      expect(getPanoPreview).toHaveBeenCalledWith({ latitude: 1, longitude: 0 });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_DETAIL_REQUEST });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_PANO_PREVIEW_REQUEST });
    });

    it('should dispatch action to fetch detail', () => {
      const store = configureMockStore()({ ...getDetailState });
      jest.spyOn(store, 'dispatch');
      shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(getMapSearchResults).not.toHaveBeenCalledWith();
      expect(getMapDetail).toHaveBeenCalledWith('https://acc.api.data.amsterdam.nl/fake/endpoint', { name: 'User name' });
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_MAP_DETAIL_REQUEST });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_PANO_PREVIEW_REQUEST });
    });
  });

  describe('updating data', () => {
    it('should fetch search results with new search state', () => {
      const store = configureMockStore()({ ...initialState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      getMapSearchResults.mockClear();
      getMapDetail.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ searchLocation: { latitude: 1, longitude: 0 } });

      expect(getMapSearchResults).toHaveBeenCalledWith({
        latitude: 1,
        longitude: 0
      }, { name: 'User name' });
      expect(getMapDetail).not.toHaveBeenCalled();
      expect(getPanoPreview).toHaveBeenCalledWith({ latitude: 1, longitude: 0 });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_DETAIL_REQUEST });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_PANO_PREVIEW_REQUEST });
    });

    it('should fetch search results with new search location', () => {
      const store = configureMockStore()({
        ...searchState,
        search: { isLoading: false }
      });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getMapDetail.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ searchLocation: { latitude: 0, longitude: 1 } });

      expect(getMapSearchResults).toHaveBeenCalledWith({
        latitude: 0,
        longitude: 1
      }, { name: 'User name' });
      expect(getMapDetail).not.toHaveBeenCalled();
      expect(getPanoPreview).toHaveBeenCalledWith({ latitude: 0, longitude: 1 });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_DETAIL_REQUEST });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_PANO_PREVIEW_REQUEST });
    });

    it('should fetch search results when search location changes', () => {
      const store = configureMockStore()({ ...searchState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getMapDetail.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ searchLocation: { latitude: 0, longitude: 1 } });

      expect(getMapSearchResults).toHaveBeenCalledWith({
        latitude: 0,
        longitude: 1
      }, { name: 'User name' });
      expect(getMapDetail).not.toHaveBeenCalled();
      expect(getPanoPreview).toHaveBeenCalledWith({ latitude: 0, longitude: 1 });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_DETAIL_REQUEST });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_PANO_PREVIEW_REQUEST });
    });

    it('should fetch detail with new detail state', () => {
      const store = configureMockStore()({ ...searchState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getMapDetail.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ detailEndpoint: 'https://acc.api.data.amsterdam.nl/fake/endpoint' });

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getMapDetail).toHaveBeenCalledWith('https://acc.api.data.amsterdam.nl/fake/endpoint', { name: 'User name' });
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_MAP_DETAIL_REQUEST });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_PANO_PREVIEW_REQUEST });
    });

    it('should fetch detail with new detail endpoint', () => {
      const store = configureMockStore()({ ...searchState, detail: {} });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getMapDetail.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ detailEndpoint: 'https://acc.api.data.amsterdam.nl/fake/endpoint' });

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getMapDetail).toHaveBeenCalledWith('https://acc.api.data.amsterdam.nl/fake/endpoint', { name: 'User name' });
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_MAP_DETAIL_REQUEST });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_PANO_PREVIEW_REQUEST });
    });

    it('should fetch detail when detail endpoint changes', () => {
      const store = configureMockStore()({ ...getDetailState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getMapDetail.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ detailEndpoint: 'https://acc.api.data.amsterdam.nl/fake/other-endpoint' });

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getMapDetail).toHaveBeenCalledWith('https://acc.api.data.amsterdam.nl/fake/other-endpoint', { name: 'User name' });
      expect(getPanoPreview).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_MAP_DETAIL_REQUEST });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_PANO_PREVIEW_REQUEST });
    });

    it('should fetch pano preview with new detail result', () => {
      const store = configureMockStore()({ ...searchState });
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getMapDetail.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ detailResult: { location: { latitude: 1, longitude: 2 } } });

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getMapDetail).not.toHaveBeenCalled();
      expect(getPanoPreview).toHaveBeenCalledWith({ latitude: 1, longitude: 2 });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_DETAIL_REQUEST });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_PANO_PREVIEW_REQUEST });
    });

    it('should fetch pano preview when detail result changes', () => {
      const store = configureMockStore()({ ...searchState });
      jest.spyOn(store, 'dispatch');
      selectLatestMapDetail.mockImplementation(() => ({ location: { latitude: 1, longitude: 2 } }));
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      getMapSearchResults.mockClear();
      getMapDetail.mockClear();
      getPanoPreview.mockClear();
      store.dispatch.mockClear();

      wrapper.setProps({ detailResult: { location: { latitude: 2, longitude: 1 } } });

      expect(getMapSearchResults).not.toHaveBeenCalled();
      expect(getMapDetail).not.toHaveBeenCalled();
      expect(getPanoPreview).toHaveBeenCalledWith({ latitude: 2, longitude: 1 });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_SEARCH_RESULTS_REQUEST });
      expect(store.dispatch).not.toHaveBeenCalledWith({ type: FETCH_MAP_DETAIL_REQUEST });
      expect(store.dispatch).toHaveBeenCalledWith({ type: FETCH_PANO_PREVIEW_REQUEST });
    });
  });

  describe('rendering', () => {
    beforeEach(() => {
      getLocationId.mockImplementation(() => '1,0');
      getShortSelectedLocation.mockImplementation(() => ({
        longitude: 0,
        latitude: 1
      }));
      getSelectedLocation.mockImplementation(() => ({}));
    });

    it('should render search results', () => {
      const store = configureMockStore()({ ...searchState });
      selectLatestMapSearchResults.mockImplementation(() => [{ item: 1 }, { item: 2 }]);

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();

      // Update results
      wrapper.setProps({ results: [{ item: 3 }] });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render search results without pano', () => {
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

    it('should render empty search results', () => {
      const store = configureMockStore()({ ...searchState });
      selectLatestMapSearchResults.mockImplementation(() => []);

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();

      // Update results
      wrapper.setProps({ results: [{ item: 3 }] });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render loading of search results', () => {
      const store = configureMockStore()({ ...searchState });
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      wrapper.setProps({ search: { isLoading: true } });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render detail', () => {
      const store = configureMockStore()({ ...detailState });
      selectLatestMapSearchResults.mockImplementation(() => [{ item: 1 }, { item: 2 }]);
      selectLatestMapDetail.mockImplementation(() => ({ location: { latitude: 1, longitude: 0 } }));

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();

      // Update detail
      wrapper.setProps({ detailResult: { location: { latitude: 2, longitude: 1 } } });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render detail without pano', () => {
      const store = configureMockStore()({ ...detailState });
      selectLatestMapDetail.mockImplementation(() => ({ location: { latitude: 1, longitude: 2 } }));

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();

      // Set pano
      wrapper.setProps({
        pano: {
          previews: {
            '1,2': { url: 'different-pano-url' }
          }
        }
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render one missing layer', () => {
      const store = configureMockStore()({ ...searchState });
      selectLatestMapSearchResults.mockImplementation(() => [{ item: 1 }, { item: 2 }]);
      selectNotClickableVisibleMapLayers.mockImplementation(() => [{
        title: 'Layer 1',
        something: 'else'
      }]);

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(wrapper).toMatchSnapshot();
    });

    it('should render multiple missing layers', () => {
      const store = configureMockStore()({ ...searchState });
      selectLatestMapSearchResults.mockImplementation(() => [{ item: 1 }, { item: 2 }]);
      selectNotClickableVisibleMapLayers.mockImplementation(() => ([
        { title: 'Layer 1', something: 'else' },
        { title: 'Layer 2', something: 1 }
      ]));

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      expect(wrapper).toMatchSnapshot();
    });

    it('should render loading of detail', () => {
      const store = configureMockStore()({ ...detailState });
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();

      wrapper.setProps({ mapDetail: { isLoading: true } });
      expect(wrapper).toMatchSnapshot();
    });

    it('should render visibility', () => {
      const store = configureMockStore()({ ...searchState });
      selectLatestMapSearchResults.mockImplementation(() => [{ item: 3 }]);

      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      wrapper.setProps({ mapClickLocation: null });
      expect(wrapper).toMatchSnapshot();

      wrapper.setProps({ mapClickLocation: {} });
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render when the application is in embed state', () => {
      const store = configureMockStore()({ ...searchState, ui: { isEmbed: true } });
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render when the application is in embed preview state', () => {
      const store = configureMockStore()({ ...searchState, ui: { isEmbedPreview: true } });
      const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should maximize the preview panel', () => {
    const store = configureMockStore()(searchState);
    jest.spyOn(store, 'dispatch');
    const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
    wrapper.find('.map-preview-panel__button').at(0).simulate('click');

    // TODO: refactor, add expectations
  });

  it('should close the preview panel', () => {
    const store = configureMockStore()(searchState);
    jest.spyOn(store, 'dispatch');
    const wrapper = shallow(<MapPreviewPanelContainer />, { context: { store } }).dive();
    wrapper.find('.map-preview-panel__button').at(1).simulate('click');

    expect(store.dispatch).toHaveBeenCalledWith(toMap());
  });

  describe('onPanoPreviewClick', () => {
    it('should dispatch', () => {
      const store = configureMockStore()({
        ...initialState,
        pano: {
          location: {
            latitude: 123,
            longitude: 321
          },
          previews: {
            '123,321': 'location'
          }
        }
      });
      getLocationId.mockImplementation(() => '123,321');
      jest.spyOn(store, 'dispatch');
      const wrapper = shallow(<MapPreviewPanelContainer />, {
        context: {
          store
        }
      }).dive();
      wrapper.instance().onPanoPreviewClick();
      expect(store.dispatch).toHaveBeenCalledWith(toPanorama());
    });
  });
});
