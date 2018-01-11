export const MAP_CLEAR_DRAWING = 'MAP_CLEAR_DRAWING';

const initialState = {
  viewCenter: [52.3731081, 4.8932945],
  baseLayer: 'topografie',
  zoom: 11,
  overlays: [],
  isLoading: false,
  drawingMode: 'none',
  highlight: true
};

export default function MapReducer(state = initialState, action) {
  switch (action.type) {
    case MAP_CLEAR_DRAWING:
      return {
        ...state,
        geometry: []
      };

    default:
      return state;
  }
}

export const mapClearDrawing = () => ({ type: MAP_CLEAR_DRAWING });

window.reducers = window.reducers || {};
window.reducers.MapReducer = MapReducer;
