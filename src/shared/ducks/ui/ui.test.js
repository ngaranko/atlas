import UiReducer, {
  hideMapPanel,
  showMapPanel,
  toggleMapPanel,
  toggleMapPanelHandle,
  toggleMapFullscreen
} from './ui';

describe('UiReducer', () => {
  let state;

  beforeEach(() => {
    state = UiReducer(undefined, {});
  });

  it('should set the initial state', () => {
    expect(state).toEqual({
      isMapPanelVisible: false,
      isMapPanelHandleVisible: true,
      isMapFullscreen: false
    });
  });

  it('should show the map panel', () => {
    expect(UiReducer(state, showMapPanel())).toEqual({
      ...state,
      isMapPanelVisible: true
    });
  });

  it('should hide the map panel', () => {
    const newState = UiReducer(state, showMapPanel());
    expect(UiReducer(newState, hideMapPanel())).toEqual({
      ...state,
      isMapPanelVisible: false
    });
  });

  it('should toggle the map panel', () => {
    const newState = UiReducer(state, toggleMapPanel());
    expect(newState).toEqual({
      ...state,
      isMapPanelVisible: true
    });
    expect(UiReducer(newState, toggleMapPanel())).toEqual({
      ...state,
      isMapPanelVisible: false
    });
  });

  it('should toggle the map panel handle', () => {
    const newState = UiReducer(state, toggleMapPanelHandle());
    expect(newState).toEqual({
      ...state,
      isMapPanelHandleVisible: false
    });
    expect(UiReducer(newState, toggleMapPanelHandle())).toEqual({
      ...state,
      isMapPanelHandleVisible: true
    });
  });

  it('should toggle the map fullscreen', () => {
    const newState = UiReducer(state, toggleMapFullscreen());
    expect(newState).toEqual({
      ...state,
      isMapFullscreen: true
    });
    expect(UiReducer(newState, toggleMapFullscreen())).toEqual({
      ...state,
      isMapFullscreen: false
    });
  });
});
