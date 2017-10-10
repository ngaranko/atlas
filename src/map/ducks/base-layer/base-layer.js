export const MAP_SET_BASELAYER = 'MAP_SET_BASELAYER';

const initialState = {};

export default function MapBaseLayerReducer(state = initialState, action) {
  switch (action.type) {
    case MAP_SET_BASELAYER:
      return {
        ...state,
        map: {
          ...state.map,
          baseLayer: action.baseLayerId
        }
      };

    default:
      return state;
  }
}

export const setBaseLayer = baseLayerId => ({ type: MAP_SET_BASELAYER, baseLayerId });

window.MapBaseLayerReducer = MapBaseLayerReducer;
