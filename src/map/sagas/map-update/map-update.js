import querystring from 'querystring';
import { put, select, takeLatest } from 'redux-saga/es/internal/io';
import { redirect } from 'redux-first-router';
import { MAP_PAN, MAP_ZOOM } from '../../ducks/map/map';
import mapQuery from '../../ducks/map/map-query';
import filtersQuery from '../../../shared/ducks/filters/filters-query';
import selectionQuery from '../../../shared/ducks/selection/selection-query';
import straatbeeldQuery from '../../../shared/ducks/straatbeeld/straatbeeld-query';
import {
  CLEAR_SELECTION,
  SET_SELECTION
} from '../../../shared/ducks/selection/selection';
import { SET_STRAATBEELD_ORIENTATION } from '../../../shared/ducks/straatbeeld/straatbeeld';
import { APPLY_FILTERS, EMPTY_FILTERS } from '../../../shared/ducks/filters/filters';

const queryMapping = [
  ...mapQuery,
  ...filtersQuery,
  ...selectionQuery,
  ...straatbeeldQuery
];

function* updateMapQuery() {
  const state = yield select(); // TODO: refactor, select only required sub state

  const currentQuery = state.location.query;

  const query = {
    ...currentQuery
  };

  let addHistory = false;
  for (const queryMap of queryMapping) {
    // console.log(key);
    // console.log(value);
    const { param, selector, defaultValue } = queryMap;
    const selectedState = selector(state);
    // console.log('selectedState', selectedState);

    if (selectedState && selectedState !== defaultValue) {
      query[param] = selectedState;
      if (queryMap.addHistory) {
        addHistory = true;
      }
    } else {
      if (query[param] && queryMap.addHistory) {
        // Value was set, so removal should be added to history
        addHistory = true;
      }
      delete query[param];
    }
  }
  const noop = (params) => params;
  const routeWrapper = addHistory ? noop : redirect;

  const USE_REDUX_FIRST_ROUTER = false;
  if (USE_REDUX_FIRST_ROUTER) {
    yield put(routeWrapper({
      type: state.location.type,
      payload: state.location.payload,
      meta: {
        query
      }
    }));
  } else {
    // console.log('query', query);
    const searchQuery = querystring.stringify(query);
    // console.log('searchQuery', searchQuery);
    history.replaceState(undefined, undefined, `?${searchQuery}`);
    // TODO: refactor, use history npm package object
  }
}

// TODO:
// * Only listen to MAP actions
export default function* watchMapUpdate() {
  yield takeLatest([
    MAP_PAN,
    MAP_ZOOM,
    SET_SELECTION,
    CLEAR_SELECTION,
    SET_STRAATBEELD_ORIENTATION,
    APPLY_FILTERS,
    EMPTY_FILTERS
  ], updateMapQuery);
}
