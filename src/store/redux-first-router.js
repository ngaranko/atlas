import { createSelector } from 'reselect';
import { routing } from '../app/routes';
import PAGES from '../app/pages';

export const REDUCER_KEY = 'location';

// selectors
const getLocation = (state) => state[REDUCER_KEY];

export const getLocationQuery = createSelector(getLocation, (location) => location.query || {});
export const getLocationPayload = createSelector(getLocation, (location) => location.payload);

export const getPage = createSelector(getLocation, (location = {}) => {
  const key = Object.keys(routing).find((route) => routing[route].type === location.type);
  return key && routing[key].page;
});

export const isMapView = createSelector(
  getLocationQuery,
  (query) => (
    Object.prototype.hasOwnProperty.call(query, 'kaart') || false
  )
);

export const isHomepage = createSelector(getPage, (page) => page === PAGES.HOME);

export const isMapPage = createSelector(getPage, (page) => page === PAGES.KAART);

export const isPanoPage = createSelector(getPage, (page) => page === PAGES.PANORAMA);

export const isDataDetailPage = createSelector(getPage, (page) => page === PAGES.DATA_DETAIL);

export const isMapActive = createSelector(
  isMapView, isMapPage,
  (isMap, isMapPageActive) => isMap || isMapPageActive
);

export const isDatasetPage = createSelector(
  getPage,
  (page) => page === PAGES.DATASETS
    || page === PAGES.DATASETS_DETAIL
    || page === PAGES.SEARCH_DATASETS
);

export const isDataSelectionPage = createSelector(
  getPage,
  (page) => page === PAGES.ADDRESSES
    || page === PAGES.CADASTRAL_OBJECTS
    || page === PAGES.ESTABLISHMENTS
);
