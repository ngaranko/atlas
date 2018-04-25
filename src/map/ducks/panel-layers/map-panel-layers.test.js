import reducer, {
  FETCH_PANEL_ITEMS_REQUEST,
  FETCH_PANEL_ITEMS_SUCCESS,
  FETCH_PANEL_ITEMS_FAILURE
} from './map-panel-layers';

const initialState = {
  items: [],
  isLoading: false,
  error: null
};
describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_PANEL_LAYERS_REQUEST', () => {
    const startAction = {
      type: FETCH_PANEL_ITEMS_REQUEST
    };
    expect(reducer({}, startAction)).toEqual({
      error: null,
      isLoading: true
    });
  });

  it('should handle FETCH_PANEL_ITEMS_SUCCESS', () => {
    const successAction = {
      type: FETCH_PANEL_ITEMS_SUCCESS,
      panelLayers: [{ id: 1 }]
    };
    expect(reducer({}, successAction)).toEqual({
      isLoading: false,
      items: [...successAction.panelLayers]
    });
  });

  it('should handle FETCH_PANEL_ITEMS_FAILURE', () => {
    const updateAction = {
      type: FETCH_PANEL_ITEMS_FAILURE,
      error: 'Error'
    };
    expect(reducer({}, updateAction)).toEqual({
      error: 'Error',
      isLoading: false
    });
  });
});
