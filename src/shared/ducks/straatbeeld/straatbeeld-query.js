import { getStraatbeeldHeading, getStraatbeeldPitch } from './straatbeeld';

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
