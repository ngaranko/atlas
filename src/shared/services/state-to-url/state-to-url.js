import stateUrlConverter from '../routing/state-url-converter';

function update(state, useReplace) {
  const stateToParams = stateUrlConverter.state2params(state);
  if (useReplace) {
    window.history.replaceState(stateToParams, null, null);
  } else {
    window.history.pushState(stateToParams, null, null);
  }
}

const stateToUrl = {
  update
};

export default stateToUrl;
