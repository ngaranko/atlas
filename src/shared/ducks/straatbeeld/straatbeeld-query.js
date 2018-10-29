import {
  getStraatbeeldHeading,
  getStraatbeeldPitch,
  SET_STRAATBEELD_ORIENTATION
} from './straatbeeld';

export default [
  {
    param: 'heading',
    selector: getStraatbeeldHeading
  },
  {
    param: 'pitch',
    selector: getStraatbeeldPitch
  }
];

export const ACTIONS = [SET_STRAATBEELD_ORIENTATION];
