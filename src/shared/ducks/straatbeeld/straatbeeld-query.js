import {
  initialState,
  getStraatbeeldHeading,
  getStraatbeeldPitch,
  SET_STRAATBEELD_ORIENTATION
} from './straatbeeld';

export default {
  heading: {
    selector: getStraatbeeldHeading,
    defaultValue: initialState.heading
  },
  pitch: {
    selector: getStraatbeeldPitch,
    defaultValue: initialState.pitch
  }
};

export const ACTIONS = [SET_STRAATBEELD_ORIENTATION];
