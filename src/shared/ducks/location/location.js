import { createSelector } from 'reselect';

const REDUCER_KEY = 'location';

const getLocationState = (state) => state[REDUCER_KEY];
export const getLocationType = createSelector(getLocationState, (location) => location.type);
