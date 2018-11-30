import { getDataSearchView, getLocation, getSearchQuery } from './selectors';
import parseLocationString from '../../../map/ducks/map/location-parse';
import { SEARCH_VIEW } from './constants';

export default {
  zoekterm: {
    stateKey: 'query',
    selector: getSearchQuery,
    decode: (val) => val,
    defaultValue: null
  },
  kaart: {
    stateKey: 'view',
    selector: getDataSearchView,
    decode: (val) => ((val) ? SEARCH_VIEW.MAP_SEARCH : SEARCH_VIEW.SEARCH),
    defaultValue: SEARCH_VIEW.SEARCH
  },
  // locatie: {
  //   stateKey: 'location',
  //   selector: getLocation,
  //   decode: (val) => {
  //     if (val) {
  //       const latLngObj = parseLocationString(val);
  //       return {
  //         latitude: latLngObj.lat,
  //         longitude: latLngObj.lng
  //       };
  //     }
  //     return null;
  //   },
  //   defaultValue: null
  // }
};

export const ACTIONS = [];
