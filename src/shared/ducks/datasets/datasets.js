import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import results, { REDUCER_KEY as DATA } from './data/data';
import filters, { REDUCER_KEY as API_SPECIFICATION } from './apiSpecification/apiSpecification';

export const REDUCER_KEY = 'datasets';

export default combineReducers({
  [DATA]: results,
  [API_SPECIFICATION]: filters
});

// Selectors
export const getDatasetsData = (state) => state[REDUCER_KEY][DATA];
export const getDatasetApiSpecification = (state) => state[REDUCER_KEY][API_SPECIFICATION].data;

export const getResults = createSelector(getDatasetsData, (datasets) => datasets.result || {});
export const getFilters = createSelector(getResults, (result) => result.filters || []);
export const getAuthError = createSelector(getDatasetsData, (resultState) => resultState.authError);
export const getPage = createSelector(getDatasetsData, (resultState) => resultState.page);
export const dataIsLoading = createSelector(
  getDatasetsData,
  (resultState) => resultState.isLoading
);
