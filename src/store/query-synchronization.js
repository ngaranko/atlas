import querystring from 'querystring';
import createHistory from 'history/createBrowserHistory';
import { select, takeLatest } from 'redux-saga/es/internal/io';
import mapQuery, { ACTIONS as MAP_ACTIONS } from '../map/ducks/map/map-query';
import filtersQuery, { ACTIONS as FILTERS_ACTIONS } from '../shared/ducks/filters/filters-query';
import selectionQuery, { ACTIONS as SELECTION_ACTIONS } from '../shared/ducks/selection/selection-query';
import straatbeeldQuery, { ACTIONS as STRAATBEELD_ACTIONS } from '../shared/ducks/straatbeeld/straatbeeld-query';
import dataSelectionQuery, { ACTIONS as DATA_SELECTION_ACTIONS } from '../shared/ducks/data-selection/data-selection-query';
import { getLocationQuery, getLocationType } from './redux-first-router';

const separateHistory = createHistory();

const watchedActions = [
  ...MAP_ACTIONS,
  ...SELECTION_ACTIONS,
  ...STRAATBEELD_ACTIONS,
  ...FILTERS_ACTIONS,
  ...DATA_SELECTION_ACTIONS
];

const queryMappings = {
  ...mapQuery,
  ...filtersQuery,
  ...selectionQuery,
  ...straatbeeldQuery,
  ...dataSelectionQuery
};

function* updateQuery() {
  const state = yield select();
  const currentQuery = yield select(getLocationQuery);
  const currentLocationType = yield select(getLocationType);
  const query = { ...currentQuery };

  let addHistory = false;
  Object.entries(queryMappings).forEach(([param, mapping]) => {
    const { selector, defaultValue } = mapping;
    const selectedState = selector(state);

    if (selectedState && selectedState !== defaultValue) {
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

  const searchQuery = querystring.stringify(orderedQuery);
  const currentPath = window.location.pathname;
  if (addHistory) {
    separateHistory.push(`${currentPath}?${searchQuery}`);
  } else {
    separateHistory.replace(`${currentPath}?${searchQuery}`);
  }
}

export default function* watchQueryActions() {
  yield takeLatest(watchedActions, updateQuery);
}
