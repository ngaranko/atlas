import { createSelector } from 'reselect';
import { routing } from '../../../app/routes';
import { STRAATBEELD_CONFIG } from '../../services/straatbeeld-api/straatbeeld-api';
import {
  straatbeeldOrientationType,
  straatbeeldPersonType
} from '../../../map/components/leaflet/services/icons.constant';
import { UPDATE_MAP } from '../../../map/ducks/map/map';

export const FETCH_STRAATBEELD_BY_ID = 'FETCH_STRAATBEELD_BY_ID';
export const FETCH_STRAATBEELD_BY_LOCATION = 'FETCH_STRAATBEELD_BY_LOCATION';
export const FETCH_STRAATBEELD_BY_HOTSPOT = 'FETCH_STRAATBEELD_BY_HOTSPOT';
export const SET_STRAATBEELD_ORIENTATION = 'SET_STRAATBEELD_ORIENTATION';
export const STRAATBEELD_OFF = 'STRAATBEELD_OFF';
export const SET_STRAATBEELD = 'SET_STRAATBEELD';
export const SET_STRAATBEELD_HISTORY = 'SET_STRAATBEELD_HISTORY';

function getHeadingDegrees([x1, y1], [x2, y2]) {
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

export const PANORAMA_VIEW = {
  MAP: 'MAP',
  MAP_PANO: 'MAP_PANO',
  PANO: 'PANO'
};

const initialState = {
  location: null, // eg: [52.8, 4.9]
  history: 0,     // eg: 2016
  pitch: null,       // eg: -10
  heading: 0,     // eg: 270
  fov: null,         // eg: 65
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
    case routing.panorama.type: {
      const { query = {} } = action.meta;
      // console.log(action.meta);
      // console.log(query);
      // console.log('query.hasOwnProperty(\'kaart\')', query.hasOwnProperty('kaart'));
      if (query.hasOwnProperty('kaart')) {
        return {
          ...state,
          view: PANORAMA_VIEW.MAP
        };
      }
      if (query.hasOwnProperty('panorama')) {
        return {
          ...state,
          view: PANORAMA_VIEW.PANO
        };
      }
      return {
        ...state,
        view: PANORAMA_VIEW.MAP_PANO
      };
    }
    case FETCH_STRAATBEELD_BY_ID:
    case FETCH_STRAATBEELD_BY_HOTSPOT:
      return {
        ...state,
        ...initialState,
        id: action.payload.id || (action.meta && action.meta.query.panoId),
        heading: action.payload.heading ||
          (state && state.heading) || (action.meta && action.meta.query.panoHeading) ||
          0,
        isLoading: true,
        isInitial: action.payload.isInitial,
        isFullscreen: typeof action.payload.isFullscreen !== 'undefined' ? action.payload.isFullscreen
          : state && state.isFullscreen ? state.isFullscreen
            : undefined
      };

    case FETCH_STRAATBEELD_BY_LOCATION:
      return {
        ...state,
        isLoading: true,
        location: action.payload,
        targetLocation: action.payload
      };

    case SET_STRAATBEELD_HISTORY:
      return (state !== null) ? {
        ...state,
        history: action.payload
      } : state;

    case SET_STRAATBEELD:
      return (state) ? {
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
      } : null;

    case SET_STRAATBEELD_ORIENTATION:
      return (action.payload) ? {
        ...state,
        heading: action.payload.heading,
        pitch: action.payload.pitch,
        fov: action.payload.fov
      } : null;

    case routing.map.type:
    case STRAATBEELD_OFF:
      return {};

    default:
      return state;
  }
}

// Actions

export const fetchStraatbeeldById = (id) => ({
  type: FETCH_STRAATBEELD_BY_ID,
  payload: {
    id
  }
});

export const setStraatbeeld = (straatbeeldData) => ({
  type: SET_STRAATBEELD,
  payload: straatbeeldData
});

export const setStraatbeeldOff = () => ({ type: STRAATBEELD_OFF });

// Selectors
export const getStraatbeeld = (state) => state.straatbeeld || {};
export const getStraatbeeldLocation = createSelector(
  getStraatbeeld,
  (straatbeeld) => (
    straatbeeld ? straatbeeld.location : ''
  )
);
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

export const getStraatbeeldView = createSelector(getStraatbeeld, (straatbeeld) => straatbeeld.view);

export const showStraatbeeld = ({ id, heading }) => ({
  type: UPDATE_MAP,
  payload: {
    route: routing.panorama.type,
    query: {
      panoId: id,
      panoHeading: heading
    }
  }
});
