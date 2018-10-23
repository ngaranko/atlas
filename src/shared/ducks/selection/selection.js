import get from 'lodash.get';
import { routing } from '../../../app/routes';
import parseLocationString from '../../../map/ducks/map/location-parse';

export const REDUCER_KEY = 'selection';

const SET_SELECTION = 'SET_SELECTION';

export const SELECTION_TYPE = {
  NONE: 'NONE',
  POINT: 'POINT',
  OBJECT: 'OBJECT',
  PANORAMA: 'PANORAMA'
};

const initialState = {
  type: SELECTION_TYPE.NONE
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case routing.map.type: {
      const locationString = get(action, 'meta.query.selectedLocation');
      if (locationString) {
        const latLngObj = parseLocationString(locationString);
        return {
          type: SELECTION_TYPE.POINT,
          location: {
            latitude: latLngObj.lat,
            longitude: latLngObj.lng
          }
        };
      }
      return {
        type: SELECTION_TYPE.NONE
      };
    }
    case routing.adresDetail.type:
    case routing.pandDetail.type:
      return {
        type: SELECTION_TYPE.OBJECT,
        id: action.payload.id
      };
    case routing.panorama.type:
      return {
        type: SELECTION_TYPE.PANORAMA,
        id: action.payload.id
      };
    case SET_SELECTION: {
      if (action.payload.selectionType === SELECTION_TYPE.POINT) {
        return {
          type: action.payload.selectionType,
          location: action.payload.object
        };
      }
      return state;
    }
    default:
      return state;
  }
};

// Selectors
export const previewDataAvailable = (state) =>
    // If either an object is selected or a point search is in progress, show preview panel
  state.selection.type === SELECTION_TYPE.POINT
  || state.selection.type === SELECTION_TYPE.OBJECT
  // return Boolean(state.detail && state.detail.endpoint)
  //   || Boolean(state.search &&
  // state.search.mapSearchResultsByLocation &&
  // Object.keys(state.search.mapSearchResultsByLocation).length
  // );
;

export const getSelectionType = (state) => (state[REDUCER_KEY].type);

// Action creators
export const setSelection = (selectionType, object) => ({
  type: SET_SELECTION,
  payload: {
    selectionType,
    object
  }
});

export default reducer;
