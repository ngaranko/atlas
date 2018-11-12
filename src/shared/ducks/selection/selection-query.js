import { getSelectionLocation, SET_SELECTION, CLEAR_SELECTION } from './selection';

const getLocationString = (state) => {
  const location = getSelectionLocation(state);
  if (location) {
    return `${location.latitude},${location.longitude}`;
  }
  return undefined;
};

export default { // TODO: track location from data-search reducer
  locatie: {
    selector: getLocationString,
    addHistory: true
  }
};

export const ACTIONS = [SET_SELECTION, CLEAR_SELECTION];
