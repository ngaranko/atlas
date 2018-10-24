import { getLatitude, getLongitude } from './map-selectors';
import { initialState} from './map';
import { getMapZoom } from './map-selectors';

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
