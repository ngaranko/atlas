import MapPanelReducer, {
  hideMapPanel,
  showMapPanel,
  toggleMapPanel
} from './map-panel.js';

describe('MapPanelReducer', () => {
  let state;

  beforeEach(() => {
    state = MapPanelReducer(undefined, {});
  });

  it('should set the initial state', () => {
    expect(state).toBe(false);
  });

  it('should show the panel', () => {
    expect(MapPanelReducer(state, showMapPanel())).toBe(true);
  });

  it('should hide the panel', () => {
    const newState = MapPanelReducer(state, showMapPanel());
    expect(newState).toBe(true);
    expect(MapPanelReducer(newState, hideMapPanel())).toBe(false);
  });

  it('should toggle the panel', () => {
    const newState = MapPanelReducer(state, toggleMapPanel());
    expect(newState).toBe(true);
    expect(MapPanelReducer(newState, toggleMapPanel())).toBe(false);
  });
});
