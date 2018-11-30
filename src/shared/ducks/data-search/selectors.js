import { createSelector } from 'reselect';
import get from 'lodash.get';
import { REDUCER_KEY } from './constants';

/**
 * @deprecated Don't use getDataSearch outside reducer,
 * use specific selector. e.g.: getNumberOfResults()
 */
export const getDataSearch = (state) => state[REDUCER_KEY];
export const isSearchActive = createSelector(getDataSearch, (geoSearch) => (
  geoSearch && geoSearch.location && geoSearch.location.length
));
export const getDataSearchLocation = (state) => state[REDUCER_KEY].geoSearch;
export const getDataSearchView = (state) => state[REDUCER_KEY].view;
export const getMapResultsByLocation = (state) => get(state, [REDUCER_KEY, 'mapSearchResultsByLocation'], []);
export const isSearchLoading = (state) => state[REDUCER_KEY].isLoading;
export const getSearchQuery = (state) => state[REDUCER_KEY].query;
export const getLocation = (state) => state[REDUCER_KEY].location;
export const getSearchCategory = (state) => state[REDUCER_KEY].category;
export const getNumberOfResults = (state) => state[REDUCER_KEY].numberOfResults;
