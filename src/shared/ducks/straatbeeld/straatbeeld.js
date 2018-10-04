import { createSelector } from 'reselect';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import ACTIONS from '../../actions';
import { routing } from '../../../app/routes';
import {
  getImageDataById,
  getImageDataByLocation,
  STRAATBEELD_CONFIG
} from '../../services/straatbeeld-api/straatbeeld-api';
import {
  straatbeeldOrientationType,
  straatbeeldPersonType
} from '../../../map/components/leaflet/services/icons.constant';
// Sagas

export const STRAATBEELD_OFF = 'STRAATBEELD_OFF';

function getHeadingDegrees([x1, y1], [x2, y2]) {
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

const initialState = {
  id: 'TMX7316010203-000719_pano_0000_000950',
  location: null, // eg: [52.8, 4.9]
  history: 0,     // eg: 2016
  pitch: 0,       // eg: -10
  heading: 0,     // eg: 270
  fov: 0,         // eg: 65
  image: null,    // eg: {
                  //     pattern: 'http://www.example.com/path/some-id/{this}/{that}/{thingie}.jpg',
                  //     preview: 'http://www.example.com/path/some-id/preview.jpg'
                  // }
  hotspots: [],   // eg: [{id: 'ABC124', heading: 90, distance: 18}],
  date: null,     // eg: new Date()
  isFullscreen: false,
  isInitial: true,
  isLoading: true
};

export default function straatbeeldReducer(state = initialState, action) {
  switch (action.type) {
    case routing.mapPanorama.type:
    case routing.panorama.type:
    case ACTIONS.FETCH_STRAATBEELD_BY_ID:
    case ACTIONS.FETCH_STRAATBEELD_BY_HOTSPOT:
      return {
        ...state,
        id: action.payload.id || action.meta.query.panoId,
        heading: action.payload.heading ||
          (state && state.heading) || action.meta.query.panoHeading ||
          0,
        isInitial: action.payload.isInitial,
        isFullscreen: typeof action.payload.isFullscreen !== 'undefined' ? action.payload.isFullscreen
          : state && state.isFullscreen ? state.isFullscreen
            : undefined
      };

    case ACTIONS.FETCH_STRAATBEELD_BY_LOCATION:
      return {
        ...state,
        location: action.payload,
        targetLocation: action.payload
      };

    case ACTIONS.SET_STRAATBEELD_HISTORY:
      return {
        ...state,
        history: action.payload
      };

    case ACTIONS.STRAATBEELD_FULLSCREEN:
      return {
        ...state,
        isFullscreen: typeof action.payload !== 'undefined' ? action.payload : state.isFullscreen
      };

    case ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT:
    case ACTIONS.SHOW_STRAATBEELD_INITIAL:
      return {
        ...state,
        id: action.payload.id || state.id,
        date: action.payload.date,
        pitch: state.pitch || 0,
        fov: state.fov || STRAATBEELD_CONFIG.DEFAULT_FOV,
        heading: Array.isArray(state.location) &&
        Array.isArray(state.targetLocation)
          ? getHeadingDegrees(action.payload.location, state.targetLocation)
          : state.heading,
        hotspots: action.payload.hotspots,
        isLoading: false,
        location: action.payload.location,
        image: action.payload.image
      };

    case ACTIONS.SET_STRAATBEELD_ORIENTATION:
      return {
        ...state,
        heading: action.payload.heading,
        pitch: action.payload.pitch,
        fov: action.payload.fov
      };

    case STRAATBEELD_OFF:
      return null;

    default:
      return state;
  }
}

// Actions
export const showStraatbeeldInitial = (straatbeeldData) => ({
  type: ACTIONS.SHOW_STRAATBEELD_INITIAL,
  payload: straatbeeldData
});

export const showStraatbeeldSubsequent = (straatbeeldData) => ({
  type: ACTIONS.SHOW_STRAATBEELD_SUBSEQUENT,
  payload: straatbeeldData
});

export const setStraatbeeldOff = () => ({ type: STRAATBEELD_OFF });

// Selectors
export const getStraatbeeld = (state) => state.straatbeeld || {};
export const getStraatbeeldId = createSelector(getStraatbeeld, (straatbeeld) => straatbeeld.id);
export const getStraatbeeldHistory = createSelector(getStraatbeeld, (straatbeeld) => straatbeeld.history);
export const isStraatbeeldInitiated = createSelector(getStraatbeeld, (straatbeeld) => !straatbeeld.isInitial);
export const getStraatbeeldLocation = createSelector(getStraatbeeld,
  (straatbeeld) => (
    straatbeeld ? straatbeeld.location : ''
  ));
export const getStraatbeeldHeading = createSelector(getStraatbeeld,
  (straatbeeld) => (
    straatbeeld ? straatbeeld.heading : ''
  ));
export const getStraatbeeldMarkers = createSelector([getStraatbeeldLocation, getStraatbeeldHeading],
  (location, heading) => (
    location ? [
      {
        position: location,
        type: straatbeeldOrientationType,
        heading: heading || 0
      },
      {
        position: location,
        type: straatbeeldPersonType
      }
    ] : []
  )
);

// Sagas
export function* fetchStraatbeeldImages({ type }) {
  const state = yield select();
  const actionType = isStraatbeeldInitiated(state) ?
    showStraatbeeldInitial :
    showStraatbeeldSubsequent;

  const imageData = yield call(
    (type === ACTIONS.SET_STRAATBEELD_HISTORY) ? getImageDataByLocation : getImageDataById,
    (type === ACTIONS.SET_STRAATBEELD_HISTORY) ?
      getStraatbeeldLocation(state) :
      getStraatbeeldId(state),
    getStraatbeeldHistory(state)
  );
  yield put(actionType(imageData));
}

export function* watchStraatbeeld() {
  yield takeLatest([
    routing.mapPanorama.type,
    routing.panorama.type,
    ACTIONS.FETCH_STRAATBEELD_BY_HOTSPOT,
    ACTIONS.SET_STRAATBEELD_HISTORY
  ], fetchStraatbeeldImages);
}

export const fetchStraatbeeldById = (pano) => ({
  type: 'UPDATE_MAP',
  payload: {
    route: routing.mapPanorama.type,
    query: {
      panoId: pano.id,
      panoHeading: pano.heading
    }
  }
});
