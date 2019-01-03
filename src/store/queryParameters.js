import paramsRegistry from './params-registry';
import { routing } from '../app/routes';
import { DATA_SEARCH_REDUCER } from '../shared/ducks/data-search/reducer';
import {
  getDataSearchLocation,
  getSearchCategory,
  getSearchQuery
} from '../shared/ducks/data-search/selectors';
import parseLocationString from '../map/ducks/map/location-parse';
import {
  getDataSelectionPage,
  getDataSelectionView,
  getGeometryFilters
} from '../shared/ducks/data-selection/selectors';
import { DATA_SELECTION } from '../shared/ducks/data-selection/reducer';
import { initialState as dataSelectionInitialState } from '../shared/ducks/data-selection/constants';
import { DATASETS, getPage } from '../shared/ducks/datasets/datasets';
import { DATA, initialState as datasetsDataInitialState } from '../shared/ducks/datasets/data/data';
import { getDetailView } from '../shared/ducks/detail/selectors';
import { initialState as detailInitialState } from '../shared/ducks/detail/constants';
import { DETAIL } from '../shared/ducks/detail/reducer';
import { initialState as mapInitialState, MAP } from '../map/ducks/map/map';
import {
  getCenter,
  getMapOverlays,
  getMapZoom,
  isMapPanelActive
} from '../map/ducks/map/map-selectors';
import { PANORAMA } from '../panorama/ducks/reducer';
import { initialState as panoramaInitialState } from '../panorama/ducks/constants';
import {
  getPanoramaHeading, getPanoramaLocation,
  getPanoramaPitch,
  getPanoramaView,
  getReference
} from '../panorama/ducks/selectors';
import { getFilters, REDUCER_KEY as FILTER } from '../shared/ducks/filters/filters';
import {
  initialState as UIInitialState, isEmbedded,
  isEmbedPreview,
  isPrintMode,
  UI
} from '../shared/ducks/ui/ui';

const getEncodedGeometryFilters = (state) => {
  const { markers, description } = getGeometryFilters(state);
  if (markers && description) {
    return btoa(JSON.stringify({
      markers: markers.map((latLong) => `${latLong[0]}:${latLong[1]}`).join('|'),
      description
    }));
  }
  return undefined;
};

const getDecodedGeometryFilters = (geo) => {
  let geometryFilter = dataSelectionInitialState.geometryFilter;
  if (geo) {
    const { markers, description } = JSON.parse(atob(geo));
    geometryFilter = {
      markers: markers && markers.length
        ? markers.split('|').map((latLng) => latLng.split(':').map((str) => parseFloat(str)))
        : [],
      description
    };
  }

  return geometryFilter;
};

export default paramsRegistry
  .addParameter('zoekterm', (routes) => {
    routes.add(routing.dataSearch.type, DATA_SEARCH_REDUCER, 'query', {
      encode: getSearchQuery
    });
  })
  .addParameter('page', (routes) => {
    routes.add([
      routing.addresses.type,
      routing.establishments.type,
      routing.cadastralObjects.type
    ], DATA_SELECTION, 'page', {
      encode: getDataSelectionPage
    }).add(routing.datasets.type, `${DATASETS}.${DATA}`, 'page', {
      defaultValue: datasetsDataInitialState.page,
      encode: getPage,
      decode: (value) => parseInt(value, 0) || datasetsDataInitialState.page
    });
  })
  .addParameter('geo', (routes) => {
    routes.add([
      routing.addresses.type,
      routing.establishments.type,
      routing.cadastralObjects.type
    ], DATA_SELECTION, 'geometryFilter', {
      encode: getEncodedGeometryFilters,
      decode: getDecodedGeometryFilters
    });
  })
  .addParameter('view', (routes) => {
    routes
      .add([
        routing.addresses.type,
        routing.establishments.type,
        routing.cadastralObjects.type
      ], DATA_SELECTION, 'view', {
        encode: getDataSelectionView,
        decode: (val) => val
      })
      .add(routing.dataDetail.type, DETAIL, 'view', {
        encode: getDetailView,
        decode: (val) => val,
        defaultValue: detailInitialState.view
      })
      .add(routing.panorama.type, PANORAMA, 'view', {
        defaultValue: panoramaInitialState.view,
        encode: getPanoramaView
      });
  })
  .addParameter('category', (routes) => {
    routes.add(routing.dataSearch.type, DATA_SEARCH_REDUCER, 'category', {
      defaultValue: dataSelectionInitialState.category,
      encode: getSearchCategory
    });
  })
  .addParameter('viewCenter', (routes) => {
    routes.add(routing.map.type, MAP, 'viewCenter', {
      defaultValue: mapInitialState.viewCenter,
      decode: (val = mapInitialState.viewCenter.join(',')) => val.split(',').map((ltLng) => parseFloat(ltLng)),
      encode: (state) => getCenter(state).join(',')
    });
  })
  .addParameter('zoom', (routes) => {
    routes.add([routing.map.type, routing.dataSearch.type], MAP, 'zoom', {
      defaultValue: mapInitialState.zoom,
      decode: (val) => parseFloat(val) || mapInitialState.zoom,
      encode: getMapZoom
    });
  })
  .addParameter('legenda', (routes) => {
    routes.add(routing.map.type, MAP, 'mapPanelActive', {
      defaultValue: mapInitialState.mapPanelActive,
      decode: (val) => val === 'true',
      encode: isMapPanelActive
    });
  })
  .addParameter('heading', (routes) => {
    routes.add(routing.panorama.type, PANORAMA, 'heading', {
      defaultValue: panoramaInitialState.heading,
      encode: getPanoramaHeading
    });
  })
  .addParameter('pitch', (routes) => {
    routes.add(routing.panorama.type, PANORAMA, 'pitch', {
      defaultValue: panoramaInitialState.pitch,
      encode: getPanoramaPitch
    });
  })
  .addParameter('filters', (routes) => {
    routes.add([
      routing.datasets.type,
      routing.addresses.type,
      routing.cadastralObjects.type,
      routing.establishments.type
    ], FILTER, '', {
      decode: (val) => {
        let queryToParse = '{}';
        if (val) {
          queryToParse = atob(val);
        }
        Object.assign({}, JSON.parse(queryToParse));
      },
      encode: (state) => (
        Object.keys(getFilters(state)).length ? btoa(JSON.stringify(getFilters(state))) : undefined
      )
    });
  })
  .addParameter('reference', (routes) => {
    routes.add(routing.panorama.type, PANORAMA, 'reference', {
      defaultValue: panoramaInitialState.reference,
      decode: (val) => (val && val.length ? val.split(',') : panoramaInitialState.reference),
      encode: (state) => (getReference(state).length ?
          getReference(state).join() :
          panoramaInitialState.reference
      )
    });
  })
  .addParameter('embedPreview', (routes) => {
    routes.add(routing.map.type, UI, 'isEmbedPreview', {
      defaultValue: UIInitialState.isEmbedPreview,
      encode: (state) => (isEmbedPreview(state) ? 'true' : 'false'),
      decode: (val) => val === 'true'
    }, true);
  })
  .addParameter('embed', (routes) => {
    routes.add(routing.map.type, UI, 'isEmbed', {
      defaultValue: UIInitialState.isEmbed,
      encode: (state) => (isEmbedded(state) ? 'true' : 'false'),
      decode: (val) => val === 'true'
    });
  })
  .addParameter('print', (routes) => {
    routes.add(routing.map.type, UI, 'isPrintMode', {
      defaultValue: UIInitialState.isPrintMode,
      encode: (state) => (isPrintMode(state) ? 'true' : 'false'),
      decode: (val) => val === 'true'
    }, true);
  })
  .addParameter('lagen', (routes) => {
    routes.add(routing.map.type, MAP, 'overlays', {
      defaultValue: mapInitialState.overlays,
      decode: (val) => {
        try {
          return atob(val).split('|').map((obj) => {
            const layerInfo = obj.split(':');
            return { id: layerInfo[0], isVisible: !!parseInt(layerInfo[1], 0) };
          });
        } catch (e) {
          return mapInitialState.overlays;
        }
      },
      encode: (state) => (
        btoa(
          getMapOverlays(state).map((overlay) => `${overlay.id}:${overlay.isVisible ? 1 : 0}`).join('|')
        )
      )
    });
  })
  .addParameter('locatie', (routes) => {
    routes
      .add(routing.panorama.type, PANORAMA, 'location', {
        decode: (val) => (val ? val.split(',').map((string) => parseFloat(string)) : panoramaInitialState.location),
        defaultValue: panoramaInitialState.location,
        encode: (state) => (
          getPanoramaLocation(state) ?
            getPanoramaLocation(state).join() :
            panoramaInitialState.location
        )
      })
      .add([routing.map.type, routing.dataSearch.type], DATA_SEARCH_REDUCER, 'geoSearch', {
        defaultValue: null,
        encode: (state) => {
          const location = getDataSearchLocation(state);
          if (location) {
            return `${location.latitude},${location.longitude}`;
          }
          return undefined;
        },
        decode: (val) => {
          if (val) {
            const latLngObj = parseLocationString(val);
            return {
              latitude: latLngObj.lat,
              longitude: latLngObj.lng
            };
          }
          return null;
        }
      });
  });
