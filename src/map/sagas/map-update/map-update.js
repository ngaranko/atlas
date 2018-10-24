import { put, select, takeLatest } from 'redux-saga/es/internal/io';
import { redirect } from 'redux-first-router';
import { routing } from '../../../app/routes';
import { MAP_PAN, MAP_ZOOM, initialState } from '../../ducks/map/map';
import {
  CLEAR_SELECTION,
  SELECTION_TYPE,
  SET_SELECTION
} from '../../../shared/ducks/selection/selection';
import { SET_STRAATBEELD_ORIENTATION, initialState as straatbeeldInitialState } from '../../../shared/ducks/straatbeeld/straatbeeld';
//
// /**
//  * Todo: improve this
//  * This will set the url query. It will update by default (and keep the other arguments)
//  * Unless when given payload: { replace: true }, this will replace the url query instead of updating
//  * @param action
//  * @returns {IterableIterator<*>}
//  */
// function* updateMapQuery(action) {
//   const state = yield select();
//
//   if (
//     state.selection.type === SELECTION_TYPE.PANORAMA
//     || state.selection.type === SELECTION_TYPE.OBJECT) {
//     // Do not update querystrings using this method because it will break the router,
//     // resulting in a `not-found` route resolution.
//     // TODO: refactor, remove this early exit
//     return;
//   }
//
//   try {
//     const query = {
//       ...state.location.query,
//       ...action.payload.query
//     };
//
//     // Remove keys with empty or false values
//     const sanitizedQuery = Object.keys(query).reduce((acc, key) => {
//       if (query[key]) {
//         acc[key] = query[key];
//       }
//       return acc;
//     }, {});
//
//     const noop = (params) => params;
//     const routeWrapper = action.payload.noRedirect ? noop : redirect;
//
//     yield put(routeWrapper({
//       type: action.payload.route || state.location.type || routing.map.type,
//       payload: action.payload.query && action.payload.query.pano,
//       meta: {
//         query: sanitizedQuery
//       }
//     }));
//   } catch (error) {
//     yield put({ type: 'MAP_UPDATE_ERROR', error });
//   }
// }
//
// export default function* watchMapUpdate() {
//   yield takeLatest(UPDATE_MAP, updateMapQuery);
// }

function* updateMapQuery(action) {
  const state = yield select();

  const currentQuery = state.location.query;

  const query = {
    ...currentQuery
  };

  if (state.map.viewCenter) {
    query.lat = state.map.viewCenter[0];
    query.lng = state.map.viewCenter[1];
  }
  if (state.map.zoom) {
    if (state.map.zoom !== initialState.zoom) {
      query.zoom = state.map.zoom;
    } else {
      delete query.zoom;
    }
  }

  // SELECTION
  if (state.selection.location) {
    const location = state.selection.location;
    query.selectedLocation = `${location.latitude},${location.longitude}`;
  } else {
    delete query.selectedLocation;
  }

  // STRAATBEELD
  if (state.straatbeeld.heading) {
    query.heading = state.straatbeeld.heading;
  }
  if (state.straatbeeld.pitch) {
    query.pitch = state.straatbeeld.pitch;
  }

  // TODO:
  // * do not replace for geo search
  const doRedirect = true;
  const noop = (params) => params;
  const routeWrapper = doRedirect ? redirect : noop;

  // TODO:
  // consider bypassing redux first router
  yield put(routeWrapper({
    type: state.location.type,
    payload: state.location.payload,
    meta: {
      query
    }
  }));
}

// TODO:
// * Only listen to MAP actions
export default function* watchMapUpdate() {
  yield takeLatest([
    MAP_PAN,
    MAP_ZOOM,
    SET_SELECTION,
    CLEAR_SELECTION,
    SET_STRAATBEELD_ORIENTATION
  ], updateMapQuery);
}
