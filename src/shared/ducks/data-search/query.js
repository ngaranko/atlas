import { getDataSearchLocation, getDataSearchView, getSearchQuery } from './selectors';
import { SEARCH_VIEW, SET_GEO_LOCATION } from './constants';
import parseLocationString from '../../../map/ducks/map/location-parse';

const getLocationString = (state) => {
  const location = getDataSearchLocation(state);
  if (location) {
    return `${location.latitude},${location.longitude}`;
  }
  return undefined;
};


export default {
  zoekterm: {
    stateKey: 'query',
    selector: getSearchQuery,
    decode: (val) => val,
    defaultValue: null
  },
  // Todo: move kaart to map duck
  kaart: {
    stateKey: 'view',
    selector: getDataSearchView,
    decode: (val) => ((val) ? SEARCH_VIEW.MAP_SEARCH : SEARCH_VIEW.SEARCH),
    defaultValue: SEARCH_VIEW.SEARCH
  },
  locatie: {
    stateKey: 'geoSearch',
    selector: getLocationString,
    decode: (val) => {
      if (val) {
        const latLngObj = parseLocationString(val);
        return {
          latitude: latLngObj.lat,
          longitude: latLngObj.lng
        };
      }
      return null;
    },
    defaultValue: null
  }
};

export const ACTIONS = [SET_GEO_LOCATION];
