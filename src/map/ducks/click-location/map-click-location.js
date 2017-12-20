const SET_MAP_CLICK_LOCATION = 'SET_MAP_CLICK_LOCATION';

const initialState = {};

export default function MapClickLocationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_CLICK_LOCATION:
      return {
        ...state,
        mapClickLocation: action.location
      };

    default:
      return state;
  }
}

export const setMapClickLocation = (location) => ({ type: SET_MAP_CLICK_LOCATION, location });

window.reducers = window.reducers || {};
window.reducers.MapClickLocationReducer = MapClickLocationReducer;
