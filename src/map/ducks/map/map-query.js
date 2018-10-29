import { getLatitude, getLongitude, getMapZoom } from './map-selectors';
import { initialState, MAP_PAN, MAP_ZOOM } from './map';

export default {
  lat: {
    selector: getLatitude,
    defaultValue: initialState.viewCenter[0]
  },
  lng: {
    selector: getLongitude,
    defaultValue: initialState.viewCenter[1]
  },
  zoom: {
    selector: getMapZoom,
    defaultValue: initialState.zoom
  }
};


export const ACTIONS = [MAP_PAN, MAP_ZOOM];
