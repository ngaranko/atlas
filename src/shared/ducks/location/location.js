import { createSelector } from 'reselect';
import { routing } from '../../../app/routes';
import PAGES from '../../../app/pages';

export const REDUCER_KEY = 'location';

// selectors
const getLocation = (state) => state[REDUCER_KEY];

export const getCurrentPage = createSelector(getLocation, (location) => {
  const key = Object.keys(routing).find((route) => routing[route].type === location.type);
  return key && routing[key].page;
});

export const isMapView = createSelector(
  getLocation,
  (location) => (
    (location.query && Object.prototype.hasOwnProperty.call(location.query, 'kaart')) || false
  )
);

export const isMapPage = createSelector(
  getCurrentPage,
  (currentPage) => currentPage === PAGES.KAART
);

export const isMapActive = createSelector(
  isMapView, isMapPage,
  (isMap, isMapPageActive) => isMap || isMapPageActive
);

export const isCatalogCurrentPage = createSelector(
  getCurrentPage,
  (page) => page === PAGES.CATALOGUS
    || page === PAGES.CATALOGUS_DETAIL
    || page === PAGES.SEARCH_CATALOG
);
