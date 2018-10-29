import { put, select, takeLatest } from 'redux-saga/es/internal/io';
import { redirect } from 'redux-first-router';
import mapQuery, { ACTIONS as MAP_ACTIONS } from '../map/ducks/map/map-query';
import filtersQuery, { ACTIONS as FILTERS_ACTIONS } from '../shared/ducks/filters/filters-query';
import selectionQuery, { ACTIONS as SELECTION_ACTIONS } from '../shared/ducks/selection/selection-query';
import straatbeeldQuery, { ACTIONS as STRAATBEELD_ACTIONS } from '../shared/ducks/straatbeeld/straatbeeld-query';
import { getLocationQuery } from './redux-first-router-selectors';

const watchedActions = [
  ...MAP_ACTIONS,
  ...SELECTION_ACTIONS,
  ...STRAATBEELD_ACTIONS,
  ...FILTERS_ACTIONS
];

const queryMappings = [
  ...mapQuery,
  ...filtersQuery,
  ...selectionQuery,
  ...straatbeeldQuery
];

function* updateQuery() {
  const state = yield select();
  const currentQuery = yield select(getLocationQuery);
  const query = { ...currentQuery };

  let addHistory = false;
  queryMappings.forEach((mapping) => {
    const { param, selector, defaultValue } = mapping;
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

  const noop = (params) => params;
  const routeWrapper = addHistory ? noop : redirect;
  yield put(routeWrapper({
    type: state.location.type,
    payload: state.location.payload,
    meta: {
      query
    }
  }));
}

export default function* watchQueryActions() {
  yield takeLatest(watchedActions, updateQuery);
}
