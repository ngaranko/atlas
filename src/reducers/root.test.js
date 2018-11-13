import rootReducer from './root';

import * as AutoSuggestReducer from '../header/ducks/auto-suggest/auto-suggest';
import * as DataSelectionReducer from '../shared/ducks/data-selection/data-selection';
import * as Datasets from '../shared/ducks/datasets/datasets';
import * as DataSelectionCatalogReducer
  from '../shared/ducks/datasets/apiSpecification/apiSpecification';
import * as ErrorMessageReducer from '../shared/ducks/error-message';
import * as PageReducer from '../shared/ducks/page/page';
import * as UiReducer from '../shared/ducks/ui/ui';
import * as UserReducer from '../shared/ducks/user/user';
import * as MapDetailReducer from '../map/ducks/detail/map-detail';
import * as MapReducer from '../map/ducks/map/map';
import * as MapLayersReducer from '../map/ducks/layers/map-layers';
import * as MapBaseLayersReducer from '../map/ducks/base-layers/map-base-layers';
import * as MapPanelLayersReducer from '../map/ducks/panel-layers/map-panel-layers';
import * as StraatbeeldReducer from '../shared/ducks/straatbeeld/straatbeeld';
import * as PanoPreviewReducer from '../pano/ducks/preview/pano-preview';
import * as FiltersReducer from '../shared/ducks/filters/filters';
import * as DataSearchReducer from '../shared/ducks/data-search/data-search';
import * as SelectionReducer from '../shared/ducks/selection/selection';
import * as DetailReducer from '../shared/ducks/detail/detail';

describe('the root reducer', () => {
  const deprecatedOutput = {
    dataSelection: 'dataSelection',
    page: 'page',
    map: 'map',
    mapDetail: 'mapDetail',
    detail: 'detail',
    straatbeeld: 'straatbeeld',
    ui: 'ui',
    user: 'user'
  };

  AutoSuggestReducer.default = () => 'autoSuggest';
  DataSelectionReducer.default = () => 'dataSelection';
  DataSelectionCatalogReducer.default = () => 'catalogFilters';
  ErrorMessageReducer.default = () => 'error';
  PageReducer.default = () => 'page';
  UiReducer.default = () => 'ui';
  UserReducer.default = () => 'user';
  DetailReducer.default = () => 'detail';
  MapDetailReducer.default = () => 'mapDetail';
  MapReducer.default = () => 'map';
  MapLayersReducer.default = () => 'layers';
  MapBaseLayersReducer.default = () => 'baseLayers';
  MapPanelLayersReducer.default = () => 'panelLayers';
  StraatbeeldReducer.default = () => 'straatbeeld';
  PanoPreviewReducer.default = () => 'pano';
  DataSearchReducer.default = () => 'dataSearch';
  SelectionReducer.default = () => 'selection';
  FiltersReducer.default = () => 'filters';
  Datasets.default = () => 'datasets';

  it('combines many reducers', () => {
    const state = {};
    const action = {};

    const output = rootReducer(() => 'location')(state, action);
    expect(output)
      .toEqual({
        ...deprecatedOutput,
        dataSelection: 'dataSelection',
        datasets: 'datasets',
        page: 'page',
        error: 'error',
        filters: 'filters',
        map: 'map',
        mapDetail: 'mapDetail',
        pano: 'pano',
        location: 'location',
        straatbeeld: 'straatbeeld',
        ui: 'ui',
        user: 'user',
        dataSearch: 'dataSearch',
        selection: 'selection',
        mapLayers: {
          baseLayers: 'baseLayers',
          layers: 'layers',
          panelLayers: 'panelLayers'
        },
        autoSuggest: 'autoSuggest'
      });
  });
});
