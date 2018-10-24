import { getSelectionLocation } from './selection';

const getLocationString = (state) => {
  const location = getSelectionLocation(state);
  if (location) {
    return `${location.latitude},${location.longitude}`;
  }
};

export default [
  {
    param: 'selectedLocation',
    selector: getLocationString,
    addHistory: true
  }
];
