import deepCopy from 'deep-copy';
import stateUrlConversion from './routing/state-url-conversion';
import isObject from './is-object';

function createObject(oldObj, key, params) {
  // create a state object by using its initial value (default {}) and onCreate method if defined
  const initialValues = stateUrlConversion.initialValues;
  const initialValue = initialValues[key] || {};
  const onCreate = stateUrlConversion.onCreate[key];

  let newObj = deepCopy(initialValue);
  if (typeof onCreate === 'function') {
    newObj = onCreate(oldObj, newObj, params, initialValues);
  }
  return newObj;
}

function getDefaultState(oldState, params) {
  let newState = createObject(oldState, MAIN_STATE, params);

  newState = Object
    .keys(stateUrlConversion.stateVariables)
    .reduce((result, key) => {
      const attribute = stateUrlConversion.stateVariables[key];
      let value = params[key];
      if (typeof value !== 'undefined') {
        // store value in state
        value = asStateValue(value, attribute.type, attribute.precision);
        if (typeof attribute.setValue === 'function') {
          value = attribute.setValue(value);
        }
        if (value !== null) {
          setValueForKey(result, oldState, attribute.name, value);
        }
      }
      return result;
    }, newState);

  // Set any missing state objects to null
  Object.keys(stateUrlConversion.initialValues)
        .forEach((key) => {
          if (key !== MAIN_STATE && (typeof newState[key] !== 'boolean' && !isObject(newState[key]))) {
            newState[key] = null;
          }
        });

  // Execute the post processing methods
  Object.keys(stateUrlConversion.post)
        .forEach((key) => {
          if (typeof newState[key] === 'boolean' || isObject(newState[key])) {
            newState[key] = stateUrlConversion.post[key](oldState[key], newState[key]);
          }
        });

  if (newState.filters) {
    Object.keys(newState.filters)
          .forEach((key) => {
            if (newState.filters[key] === NO_VALUE) {
              newState.filters[key] = '';
            }
          });
  }
  return newState;
}

export default getDefaultState;
