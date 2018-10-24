import { createSelector } from 'reselect';
import { routing } from '../../../app/routes';
import { STRAATBEELD_CONFIG } from '../../services/straatbeeld-api/straatbeeld-api';
import PANORAMA_VIEW from './panorama-view';
import {
  straatbeeldOrientationType,
  straatbeeldPersonType
} from '../../../map/components/leaflet/services/icons.constant';

export const FETCH_STRAATBEELD_BY_ID = 'FETCH_STRAATBEELD_BY_ID';
export const SET_STRAATBEELD_ORIENTATION = 'SET_STRAATBEELD_ORIENTATION';
export const SET_STRAATBEELD = 'SET_STRAATBEELD';
export const SET_STRAATBEELD_YEAR = 'SET_STRAATBEELD_YEAR';

const initialState = {
  location: null, // eg: [52.8, 4.9]
  year: undefined, // eg: 2016
  pitch: null,    // eg: -10
  heading: 0,     // eg: 270
  fov: null,      // eg: 65
  image: null,    // eg: {
                  //     pattern: 'http://www.example.com/path/some-id/{this}/{that}/{thingie}.jpg',
                  //     preview: 'http://www.example.com/path/some-id/preview.jpg'
                  // }
  hotspots: [],   // eg: [{id: 'ABC124', heading: 90, distance: 18}],
  date: null,     // eg: new Date()
  isLoading: true
};

export default function straatbeeldReducer(state = initialState, action) {
  switch (action.type) {
    case routing.panorama.type: {
      const { query = {} } = action.meta;
      if (Object.prototype.hasOwnProperty.call(query, 'kaart')) {
        return {
          ...state,
          view: PANORAMA_VIEW.MAP
        };
      }
      if (Object.prototype.hasOwnProperty.call(query, 'panorama')) {
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
      return {
        ...state,
        id: action.payload.id,
        heading: action.payload.heading || state.heading,
        isLoading: true
      };

    case SET_STRAATBEELD_YEAR:
      return {
        ...state,
        year: action.payload
      };

    case SET_STRAATBEELD:
      return {
        ...state,
        id: action.payload.id || state.id,
        date: action.payload.date,
        pitch: state.pitch || 0,
        fov: state.fov || STRAATBEELD_CONFIG.DEFAULT_FOV,
        hotspots: action.payload.hotspots,
        isLoading: false,
        location: action.payload.location,
        image: action.payload.image
      };

    case SET_STRAATBEELD_ORIENTATION:
      return {
        ...state,
        heading: action.payload.heading,
        pitch: action.payload.pitch,
        fov: action.payload.fov
      };

    default:
      return state;
  }
}

// Actions creators
export const fetchStraatbeeldById = (id, heading) => ({
  type: FETCH_STRAATBEELD_BY_ID,
  payload: {
    id,
    heading
  }
});

export const setStraatbeeld = (straatbeeldData) => ({
  type: SET_STRAATBEELD,
  payload: straatbeeldData
});

export const setStraatbeeldYear = (year) => ({
  type: SET_STRAATBEELD_YEAR,
  payload: year
});

export const setStraatbeeldOrientation = ({ heading, pitch, fov }) => ({
  type: SET_STRAATBEELD_ORIENTATION,
  payload: {
    heading,
    pitch,
    fov
  }
});

// Selectors
/**
 * @deprecated Don't use getStraatbeeld outside reducer,
 * use specific selector. e.g.: getStraatbeeldHeading()
 */
export const getStraatbeeld = (state) => state.straatbeeld || {};
export const getHotspots = createSelector(getStraatbeeld, (straatbeeld) => {
  const { year, hotspots } = straatbeeld;
  if (year) {
    // TODO: refactor: refire hotspots search request. Not everything is returned from back-end.
    // TODO: refactor: test hotspots are filtered by year
    return hotspots.filter((hotspot) => hotspot.year === year);
  }
  return hotspots;
});

export const getStraatbeeldLocation = createSelector(
  getStraatbeeld,
  (straatbeeld) => (
    straatbeeld ? straatbeeld.location : ''
  )
);
export const getStraatbeeldId = createSelector(getStraatbeeld, (straatbeeld) => straatbeeld.id);
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
export const getStraatbeeldYear = createSelector(getStraatbeeld, (straatbeeld) => straatbeeld.year);
