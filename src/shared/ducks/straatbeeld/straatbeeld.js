import { createSelector } from 'reselect';
import { routing } from '../../../app/routes';
import { STRAATBEELD_CONFIG } from '../../services/straatbeeld-api/straatbeeld-api';
import PANORAMA_VIEW from './panorama-view';
import {
  straatbeeldOrientationType,
  straatbeeldPersonType
} from '../../../map/components/leaflet/services/icons.constant';

export const FETCH_STRAATBEELD = 'FETCH_STRAATBEELD';
export const FETCH_STRAATBEELD_SUCCESS = 'FETCH_STRAATBEELD_SUCCESS';
export const FETCH_STRAATBEELD_ERROR = 'FETCH_STRAATBEELD_ERROR';
export const SET_STRAATBEELD_ORIENTATION = 'SET_STRAATBEELD_ORIENTATION';
export const SET_STRAATBEELD_YEAR = 'SET_STRAATBEELD_YEAR';
export const CLOSE_STRAATBEELD = 'CLOSE_STRAATBEELD';

export const initialState = {
  location: null,   // eg: [52.8, 4.9]
  year: undefined,  // eg: 2016
  pitch: 0,         // eg: -10
  heading: 0,       // eg: 270
  fov: null,        // eg: 65
  image: null,      // eg: {
                    //     pattern: 'http://www.example.com/path/some-id/{this}/{that}/{thingie}.jpg',
                    //     preview: 'http://www.example.com/path/some-id/preview.jpg'
                    // }
  hotspots: [],     // eg: [{id: 'ABC124', heading: 90, distance: 18}],
  date: null,       // eg: new Date()
  isLoading: true
};

export default function straatbeeldReducer(state = initialState, action) {
  switch (action.type) {
    case routing.panorama.type: {
      const { query = {} } = action.meta;
      let view;
      if (Object.prototype.hasOwnProperty.call(query, 'kaart')) {
        view = PANORAMA_VIEW.MAP;
      } else if (Object.prototype.hasOwnProperty.call(query, 'panorama')) {
        view = PANORAMA_VIEW.PANO;
      } else {
        view = PANORAMA_VIEW.MAP_PANO;
      }
      return {
        ...state,
        view,
        id: action.payload.id,
        heading: query.heading || state.heading,
        pitch: query.pitch || state.pitch
      };
    }

    case FETCH_STRAATBEELD:
      return {
        ...state,
        id: action.payload.id,
        isLoading: true
      };

    case SET_STRAATBEELD_YEAR:
      return {
        ...state,
        year: action.payload
      };

    case FETCH_STRAATBEELD_SUCCESS:
      return {
        ...state,
        date: action.payload.date,
        pitch: state.pitch || initialState.pitch,
        fov: state.fov || STRAATBEELD_CONFIG.DEFAULT_FOV,
        hotspots: action.payload.hotspots,
        isLoading: false,
        location: action.payload.location,
        image: action.payload.image
      };
    case FETCH_STRAATBEELD_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true // TODO: refactor, show error
      };

    case SET_STRAATBEELD_ORIENTATION:
      return {
        ...state,
        heading: action.payload.heading,
        pitch: action.payload.pitch,
        fov: action.payload.fov
      };

    case CLOSE_STRAATBEELD:
      return {
        ...state,
        location: initialState.location,
        image: initialState.image
      };

    default:
      return state;
  }
}

// Actions creators
export const fetchStraatbeeld = (id) => ({
  type: FETCH_STRAATBEELD,
  payload: {
    id
  }
});

export const fetchStraatbeeldSuccess = (straatbeeldData) => ({
  type: FETCH_STRAATBEELD_SUCCESS,
  payload: straatbeeldData
});

export const fetchStraatbeeldError = (error) => ({
  type: FETCH_STRAATBEELD_ERROR,
  payload: error
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

export const closeStraatbeeld = () => ({ type: CLOSE_STRAATBEELD });

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
  (straatbeeld) => straatbeeld.heading
);
export const getStraatbeeldPitch = createSelector(getStraatbeeld,
  (straatbeeld) => straatbeeld.pitch
);
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
