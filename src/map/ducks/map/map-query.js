import { getLatitude, getLongitude, getMapZoom } from './map-selectors';
import { initialState, MAP_PAN, MAP_ZOOM } from './map';

export default [
  {
    param: 'lat',
    selector: getLatitude,
    defaultValue: initialState.viewCenter[0]
  },
  {
    param: 'lng',
    selector: getLongitude,
    defaultValue: initialState.viewCenter[1]
  },
  {
    param: 'zoom',
    selector: getMapZoom,
    defaultValue: initialState.zoom
  }
];

export const ACTIONS = [MAP_PAN, MAP_ZOOM];
