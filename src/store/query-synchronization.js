import queryString from 'querystring';
import createHistory from 'history/createBrowserHistory';
import { select, takeLatest } from 'redux-saga/effects';
import mapQuery, { ACTIONS as MAP_ACTIONS } from '../map/ducks/map/map-query';
import filtersQuery, { ACTIONS as FILTERS_ACTIONS } from '../shared/ducks/filters/filters-query';
import selectionQuery, { ACTIONS as SELECTION_ACTIONS } from '../shared/ducks/selection/selection-query';
import straatbeeldQuery, { ACTIONS as STRAATBEELD_ACTIONS } from '../shared/ducks/straatbeeld/straatbeeld-query';
import dataSelectionQuery, { ACTIONS as DATA_SELECTION_ACTIONS } from '../shared/ducks/data-selection/data-selection-query';
import datasetQuery, { ACTIONS as DATASET_ACTIONS } from '../shared/ducks/datasets/datasets-query';
import uiQuery, { ACTIONS as UI_ACTIONS } from '../shared/ducks/ui/ui-query';
import { getLocationQuery } from './redux-first-router';

const separateHistory = createHistory();

const watchedActions = [
  ...MAP_ACTIONS,
  ...SELECTION_ACTIONS,
  ...STRAATBEELD_ACTIONS,
  ...FILTERS_ACTIONS,
  ...DATA_SELECTION_ACTIONS,
  ...DATASET_ACTIONS,
  ...UI_ACTIONS
];

const queryMappings = {
  ...mapQuery,
  ...filtersQuery,
  ...selectionQuery,
  ...straatbeeldQuery,
  ...dataSelectionQuery,
  ...datasetQuery,
  ...uiQuery
};

function* updateQuery() {
  const state = yield select();
  const currentQuery = yield select(getLocationQuery);
  const query = { ...currentQuery };

  let addHistory = false;
  Object.entries(queryMappings).forEach(([param, mapping]) => {
    const { selector, defaultValue } = mapping;
    const selectedState = selector(state);

    if (typeof selectedState !== 'undefined' && selectedState !== defaultValue) {
      query[param] = selectedState;
      if (mapping.addHistory) {
        addHistory = true;
      }
    } else {
      if (query[param] && mapping.addHistory) {
        // Value was set, so removal action should be added to history
        addHistory = true;
      }
      delete query[param];
    }
  });

  const orderedQuery = Object.keys(query).sort().reduce((acc, key) => {
    acc[key] = query[key];
    return acc;
  }, {});

  const searchQuery = queryString.stringify(orderedQuery);
  const currentPath = window.location.pathname;
  // NOTE: changing history using different history wrapper than the one used in redux-first-router!
  // We need to work with a different history object to prevent redux-first-router from reacting to
  // query changes. If we were to use the same history object, a route change would fire for every
  // query change.
  // TODO: refactor, fix hack or start resolution trajectory for redux-first-router
  if (addHistory) {
    separateHistory.push(`${currentPath}?${searchQuery}`);
  } else {
    separateHistory.replace(`${currentPath}?${searchQuery}`);
  }
}

export const getStateFromQuery = (definitions, query) => (
  Object.keys(definitions).reduce((acc, key) => {
    const decodedValue = definitions[key].decode(query[key]);
    if (decodedValue) {
      acc[definitions[key].stateKey] = decodedValue;
    }
    return acc;
  }, {})
);

export default function* watchQueryActions() {
  yield takeLatest(watchedActions, updateQuery);
}
