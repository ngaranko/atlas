import isObject from 'lodash.isobject';
import BaseCoder, { getCoderForBase } from './base-coder/base-coder';
import stateUrlConversion from './state-url-conversion';
import { isDefined, isFunction } from '../util/util';

const URL_ARRAY_SEPARATOR = ':';    // Choose any of -._~:[]@!$'()*+,;`.
const ARRAY_DENOTATOR = '[]';
const MAIN_STATE = 'DEFAULT';
const BOOLEAN_TRUE = 'T';
const BOOLEAN_FALSE = 'F';
const NO_VALUE = 'xxxx';
const FILTERS_WITH_POSSIBLE_NO_VALUE = ['postcode', 'bijzondere_rechtstoestand'];
const TYPENAME = {
  STRING: /^string$/,
  BOOLEAN: /^boolean$/,
  NUMBER: /^number$/,
  BASE62: /^base62$/,
  KEYVALUES: /^keyvalues$/,
  OBJECT: /^object\((\w+:\w+[[\]]*)(,\w+:\w+[[\]]*)*\)$/,
  ARRAY: /\[\]$/
};

const base62Coder = getCoderForBase(62);  // Code coordinates in base62

// url-state converters for every possible type

class StringValue {
  static urlValue(s) { return s; }
  static stateValue(s) { return s; }
}

class NumberValue {
  static getNumberValue(n, precision) {
    // eg return 10.1 for 10.123
    return precision === null ? n : BaseCoder.toPrecision(n, precision);
  }
  static urlValue(n, precision) { return NumberValue.getNumberValue(n, precision); }
  static stateValue(s, precision) { return NumberValue.getNumberValue(Number(s), precision); }
}

class Base62Value {
  static urlValue(n, precision) { return base62Coder.encode(n, precision); }
  static stateValue(s, precision) { return base62Coder.decode(s, precision); }
}

class BooleanValue {
  static urlValue(b) { return b ? BOOLEAN_TRUE : BOOLEAN_FALSE; }
  static stateValue(s) { return s === BOOLEAN_TRUE; }
}

class KeyValuesValue {
  static urlValue(kv, typeName, asValue, precision, separator) {
    // { key: value, key:value, ... } => key::value:key::value...
    return asValue(Object.keys(kv).map((key) => [key, kv[key]]), 'string[][]',
      precision, separator);
  }
  static stateValue(s, typeName, asValue, precision, separator) {
    // key::value:key::value... => { key: value, key:value, ... }
    return asValue(s, 'string[][]', precision, separator)
      .reduce((result, [key, keyValue]) => ({
        ...result,
        [key]: keyValue
      }), {});
  }
}

class ObjectValue {
  static getKeyTypes(typeName) {
    // object(key:type,key:type,...) => ['key:type', 'key:type', ...]
    return typeName.substring('object('.length, typeName.length - 1).split(',');
  }
  static urlValue(o, typeName, asValue, precision, separator) {
    // { id:anyValue, ... } => anyValue:anyValue:...
    return ObjectValue.getKeyTypes(typeName)
      .map((keyValue) => {
        const [key, keyType] = keyValue.split(':'); // key:type => key, type
        return asValue(o[key], keyType, precision, separator + URL_ARRAY_SEPARATOR);
      })
      .join(separator);
  }
  static stateValue(s, typeName, asValue, precision, separator) {
    // anyValue:anyValue:... => { id:anyValue, ... }
    const fields = asValue(s, 'string[]', precision, separator); // [ anyValue, anyValue, ...]
    return ObjectValue.getKeyTypes(typeName)
      .reduce((result, keyAndType, i) => {
        const [key, keyType] = keyAndType.split(':'); // key:type => key, type
        return {
          ...result,
          [key]: asValue(fields[i], keyType, precision, separator + URL_ARRAY_SEPARATOR)
        };
      }, {});
  }
}

class ArrayValue {
  static getBaseType(typeName) {
    return typeName.substr(0, typeName.length - ARRAY_DENOTATOR.length);
  }
  static urlValue(a, typeName, asValue, precision, separator) {
    // [ x, y, z, ... ] => x:y:z:...
    const baseType = ArrayValue.getBaseType(typeName);
    return a
      .map((v) => asValue(v, baseType, precision, separator + URL_ARRAY_SEPARATOR))
      .join(separator);
  }
  static stateValue(s, typeName, asValue, precision, separator) {
    // x:y:z:... => [ x, y, z, ... ]
    const baseType = ArrayValue.getBaseType(typeName);
    // Split the array, replace the split char by a tmp split char because org split char can repeat
    const TMP_SPLIT_CHAR = '|';
    const surroundBy = `(^|[^${URL_ARRAY_SEPARATOR}]|$)`;
    const splitOn = new RegExp(surroundBy + separator + surroundBy, 'g');
    const splitValue = s.replace(splitOn, `$1${TMP_SPLIT_CHAR}$2`);
    return splitValue
      .split(TMP_SPLIT_CHAR)
      .map((v) => asValue(v, baseType, precision, separator + URL_ARRAY_SEPARATOR));
  }
}

function createObject(oldObj, key, params) {
  // create a state object by using its initial value (default {}) and onCreate method if defined
  const initialValues = stateUrlConversion.initialValues;
  const initialValue = initialValues[key] || {};
  const onCreate = stateUrlConversion.onCreate[key];

  let newObj = { ...initialValue };
  if (isFunction(onCreate)) {
    newObj = onCreate(oldObj, newObj, params, initialValues);
  }
  return newObj;
}

function getFullKey(key) {
  // decompose 'map.viewCenter' in {mainKey: 'map', subKey: 'viewCenter'}
  // or 'isPrintmode' in {mainKey: 'isPrintmode'}
  const dot = key.indexOf('.');
  if (dot >= 0) {
    return {
      mainKey: key.substr(0, dot),
      subKey: key.substr(dot + 1)
    };
  }
  return {
    mainKey: key
  };
}

function getValueForKey(obj, key) {
  // return 9 for obj={map: {zoom: 9}} and key = 'map.zoom', null when no value available
  // Uses recursion for endless depth
  const { mainKey, subKey } = getFullKey(key);
  if (subKey) {
    const temp = isObject(obj[mainKey]) ? getValueForKey(obj[mainKey], subKey) : null;
    return temp;
    // return isObject(obj[mainKey]) ? getValueForKey(obj[mainKey], subKey) : null;
  }
  return obj[mainKey] || null;
}

function setValueForKey(obj, oldObj, key, value) {
  // set obj:{map: {zoom: 9}} to {map: {zoom: 8}} for key 'map.zoom' and value 8
  // the old object is used for createObject() in case of any onCreate method for the state object
  const { mainKey, subKey } = getFullKey(key);
  let result = obj;
  if (subKey) {
    result[mainKey] = obj[mainKey] || createObject(oldObj[mainKey], mainKey);
    result = setValueForKey(result[mainKey], oldObj[mainKey] || {}, subKey, value);
  } else {
    result[mainKey] = value;
  }
  return result;
}

function asUrlValue(value, typeName, precision = null, separator = URL_ARRAY_SEPARATOR) {
  // returns the value as a valid url value (URI-encoded string representation)
  let urlValue = '';

  if (typeName.match(TYPENAME.STRING)) {
    urlValue = StringValue.urlValue(value);
  } else if (typeName.match(TYPENAME.NUMBER)) {
    urlValue = NumberValue.urlValue(value, precision);
  } else if (typeName.match(TYPENAME.BASE62)) {
    urlValue = Base62Value.urlValue(value, precision);
  } else if (typeName.match(TYPENAME.BOOLEAN)) {
    urlValue = BooleanValue.urlValue(value);
  } else if (typeName.match(TYPENAME.KEYVALUES)) {
    return KeyValuesValue.urlValue(value, typeName, asUrlValue, precision, separator);
  } else if (typeName.match(TYPENAME.OBJECT)) {
    return ObjectValue.urlValue(value, typeName, asUrlValue, precision, separator);
  } else if (typeName.match(TYPENAME.ARRAY)) {
    return ArrayValue.urlValue(value, typeName, asUrlValue, precision, separator);
  }

  return encodeURI(urlValue.toString());
}

function asStateValue(decodedValue, typeName, precision = null, separator = URL_ARRAY_SEPARATOR) {
  // returns the value as a state value by using the URI-decoded string representation
  const value = decodeURI(decodedValue);
  let stateValue = null;

  if (typeName.match(TYPENAME.STRING)) {
    stateValue = StringValue.stateValue(value);
  } else if (typeName.match(TYPENAME.NUMBER)) {
    stateValue = NumberValue.stateValue(value, precision);
  } else if (typeName.match(TYPENAME.BASE62)) {
    stateValue = Base62Value.stateValue(value, precision);
  } else if (typeName.match(TYPENAME.BOOLEAN)) {
    stateValue = BooleanValue.stateValue(value);
  } else if (typeName.match(TYPENAME.KEYVALUES)) {
    return KeyValuesValue.stateValue(value, typeName, asStateValue, precision, separator);
  } else if (typeName.match(TYPENAME.OBJECT)) {
    return ObjectValue.stateValue(value, typeName, asStateValue, precision, separator);
  } else if (typeName.match(TYPENAME.ARRAY)) {
    return ArrayValue.stateValue(value, typeName, asStateValue, precision, separator);
  }

  return stateValue;
}


class StateUrlConverter {

  static state2params(state) {
    // Converts a state to a params object that is stored in the url
    return Object.keys(stateUrlConversion.stateVariables).reduce((result, key) => {
      const attribute = stateUrlConversion.stateVariables[key];
      let value = getValueForKey(state, attribute.name);
      if (value !== null) {
        // store value in url
        if (isFunction(attribute.getValue)) {
          value = attribute.getValue(value);
        }
        value = asUrlValue(value, attribute.type, attribute.precision);
        if (value) {
          const valuesRegEx = new RegExp(`(${FILTERS_WITH_POSSIBLE_NO_VALUE.join('|')}):::`, 'g');
          return {
            ...result,
            [key]: value.replace(valuesRegEx, `$1::${NO_VALUE}:`)
          };
        }
      }
      return result;
    }, {});
  }

  /**
   * Converts a params object (payload or url value) to a new state object
   * @param  {object} oldState current state
   * @param  {object} params   list of get parameters
   * @return {object}          new state
   */
  static params2state(oldState, params) {
    let newState = createObject(oldState, MAIN_STATE, params);

    newState = Object.keys(stateUrlConversion.stateVariables).reduce((result, key) => {
      const attribute = stateUrlConversion.stateVariables[key];
      let value = params[key];
      if (isDefined(value)) {
        // store value in state
        value = asStateValue(value, attribute.type, attribute.precision);
        if (isFunction(attribute.setValue)) {
          value = attribute.setValue(value);
        }
        if (value !== null) {
          return { ...result, ...setValueForKey(result, oldState, attribute.name, value) };
        }
      }
      return result;
    }, newState);

    // Set any missing state objects to null
    Object.keys(stateUrlConversion.initialValues).forEach((key) => {
      if (key !== MAIN_STATE && (typeof newState[key] !== 'boolean' && !isObject(newState[key]))) {
        newState[key] = null;
      }
    });

    // Execute the post processing methods
    Object.keys(stateUrlConversion.post).forEach((key) => {
      if (typeof newState[key] === 'boolean' || isObject(newState[key])) {
        newState[key] = stateUrlConversion.post[key](oldState[key], newState[key]);
      }
    });

    if (newState.filters) {
      Object.keys(newState.filters).forEach((key) => {
        if (newState.filters[key] === NO_VALUE) {
          newState.filters[key] = '';
        }
      });
    }
    return newState;
  }

  static state2url(state) {
    // Convert the url parameters object into a url parameter string
    const params = StateUrlConverter.state2params(state);
    return `#${Object.keys(params).reduce((result, key) => {
      let value = result;
      value += value ? '&' : '?';
      value += `${key}=${(params[key])}`;
      return value;
    }, '')}`;
  }

  static getDefaultState() {
    return StateUrlConverter.params2state({}, {});
  }
}

export default StateUrlConverter;
