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
import { initialState } from '../shared/ducks/data-selection/constants';

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
  let geometryFilter = initialState.geometryFilter;
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

paramsRegistry
  .addParameter('zoekterm', (routes, setDefaultValue) => {
    setDefaultValue(null);
    routes.add(routing.dataSearch.type, {
      reducerKey: DATA_SEARCH_REDUCER,
      stateKey: 'query',
      encode: getSearchQuery
    });
  })
  .addParameter('page', (routes) => {
    routes.add([
      routing.addresses.type,
      routing.establishments.type,
      routing.cadastralObjects.type
    ], {
      reducerKey: DATA_SELECTION,
      stateKey: 'page',
      encode: getDataSelectionPage
    });
  })
  .addParameter('geo', (routes) => {
    routes.add([
      routing.addresses.type,
      routing.establishments.type,
      routing.cadastralObjects.type
    ], {
      reducerKey: DATA_SELECTION,
      stateKey: 'geometryFilter',
      encode: getEncodedGeometryFilters,
      decode: getDecodedGeometryFilters
    });
  })
  .addParameter('view', (routes) => {
    routes.add([
      routing.addresses.type,
      routing.establishments.type,
      routing.cadastralObjects.type
    ], {
      reducerKey: DATA_SELECTION,
      stateKey: 'view',
      encode: getDataSelectionView,
      decode: (val) => val
    });
  })
  .addParameter('category', (routes) => {
    routes.add(routing.dataSearch.type, {
      reducerKey: DATA_SEARCH_REDUCER,
      stateKey: 'category',
      defaultValue: initialState.category,
      encode: getSearchCategory
    });
  })
  .addParameter('locatie', (routes) => {
    routes.add(routing.dataSearch.type, {
      reducerKey: DATA_SEARCH_REDUCER,
      stateKey: 'geoSearch',
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
