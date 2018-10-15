import { createSelector } from 'reselect';
import { routing } from '../app/routes';
import PAGES from '../app/pages';

export const REDUCER_KEY = 'currentPage';

const getCurrentPageByType = (actionType) => {
  const key = Object.keys(routing).find((route) => routing[route].type === actionType);
  return key && routing[key].page;
};

const currentPageReducer = (state = PAGES.HOME, action = {}) => (
  getCurrentPageByType(action.type) ?
    getCurrentPageByType(action.type) :
    state
);

// Selectors
export const getCurrentPage = (state) => state[REDUCER_KEY];
export const isMapCurrentPage = createSelector(
  getCurrentPage,
  (currentPage) => currentPage === PAGES.KAART
);
export const isPanoramaCurrentPage = createSelector(
  getCurrentPage,
  (currentPage) => currentPage === PAGES.PANORAMA
);

export default currentPageReducer;
