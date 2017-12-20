import UiReducer, {
  hideMapPanel,
  showMapPanel,
  toggleMapPanel
} from './ui';

describe('UiReducer', () => {
  let state;

  beforeEach(() => {
    state = UiReducer(undefined, {});
  });

  it('should set the initial state', () => {
    expect(state).toEqual({
      isMapPanelVisible: false,
      isMapPanelHandleVisible: true
    });
  });

  it('should show the panel', () => {
    expect(UiReducer(state, showMapPanel())).toEqual({
      isMapPanelVisible: true,
      isMapPanelHandleVisible: true
    });
  });

  it('should hide the panel', () => {
    const newState = UiReducer(state, showMapPanel());
    expect(UiReducer(newState, hideMapPanel())).toEqual({
      isMapPanelVisible: false,
      isMapPanelHandleVisible: true
    });
  });

  it('should toggle the panel', () => {
    const newState = UiReducer(state, toggleMapPanel());
    expect(newState).toEqual({
      isMapPanelVisible: true,
      isMapPanelHandleVisible: true
    });
    expect(UiReducer(newState, toggleMapPanel())).toEqual({
      isMapPanelVisible: false,
      isMapPanelHandleVisible: true
    });
  });
});
