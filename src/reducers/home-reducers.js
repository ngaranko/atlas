import ACTIONS from '../shared/actions';

/**
 * @param {Object} oldState
 *
 * @returns {Object} newState
 */
function showHomeReducer(state) {
  const stateUrlConverter = window.StateUrlConverter;

  const defaultState = stateUrlConverter.getDefaultState();
  return {
    ...defaultState,
    ui: {
      ...defaultState.ui,
      isEmbed: state.ui.isEmbed,
      isEmbedPreview: state.ui.isEmbedPreview,
      isPrintMode: state.ui.isPrintMode
    }
  };
}

var reducers = {};

reducers[ACTIONS.SHOW_HOME.id] = showHomeReducer;

export default reducers;
