import {
  getStraatbeeldHeading,
  getStraatbeeldPitch,
  SET_STRAATBEELD_ORIENTATION
} from './straatbeeld';

export default {
  heading: {
    selector: getStraatbeeldHeading
  },
  pitch: {
    selector: getStraatbeeldPitch
  }
};

export const ACTIONS = [SET_STRAATBEELD_ORIENTATION];
