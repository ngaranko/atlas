(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('stateUrlConverter', stateUrlConverterFactory);

    stateUrlConverterFactory.$inject = ['STATE_URL_CONVERSION'];

    function stateUrlConverterFactory (STATE_URL_CONVERSION) {
        const URL_ARRAY_SEPARATOR = ':';
        const ARRAY_DENOTATOR = '[]';
        const TYPENAME = {
            STRING: /^string$/,
            BOOLEAN: /^boolean$/,
            NUMBER: /^number$/,
            ARRAY: /\[\]$/
        };

        return {
            state2params,
            params2state,
            compareObject
        };

        function createObject (oldObj, key, params) {
            let initialValues = STATE_URL_CONVERSION.initialValues,
                initialValue = initialValues[key] || {},
                pre = STATE_URL_CONVERSION.pre[key];

            let newObj = angular.copy(initialValue);
            if (angular.isFunction(pre)) {
                newObj = pre(oldObj, newObj, params, initialValues);
            }
            return newObj;
        }

        function getFullKey (key) {
            let dot = key.indexOf('.');
            if (dot >= 0) {
                return {
                    mainKey: key.substr(0, dot),
                    subKey: key.substr(dot + 1)
                };
            } else {
                return {
                    mainKey: key
                };
            }
        }

        function getValueForKey (obj, key) {
            let {mainKey, subKey} = getFullKey(key);
            if (subKey) {
                return angular.isObject(obj[mainKey]) ? getValueForKey(obj[mainKey], subKey) : null;
            } else {
                return obj[mainKey] || null;
            }
        }

        function setValueForKey (obj, oldObj, key, value) {
            let {mainKey, subKey} = getFullKey(key);
            if (subKey) {
                obj[mainKey] = obj[mainKey] || createObject(oldObj[mainKey], mainKey);
                setValueForKey(obj[mainKey], oldObj[mainKey], subKey, value);
            } else {
                obj[mainKey] = value;
            }
        }

        function asUrlValue (value, typeName, separator = URL_ARRAY_SEPARATOR) {
            // console.log('asUrlValue', value, typeName, separator);
            let urlValue;

            if (typeName.match(TYPENAME.STRING)) {
                urlValue = value;
            } else if (typeName.match(TYPENAME.NUMBER)) {
                urlValue = value;
            } else if (typeName.match(TYPENAME.BOOLEAN)) {
                urlValue = value ? 'T' : 'F';
            } else if (typeName.match(TYPENAME.ARRAY)) {
                let baseType = typeName.substr(0, typeName.length - ARRAY_DENOTATOR.length);
                urlValue = (value || [])
                    .map(v => asUrlValue(v, baseType, separator + URL_ARRAY_SEPARATOR))
                    .join(separator);
            } else {
                // to be defined
            }

            // console.log('URL value', value, typeName, urlValue);
            return encodeURI(urlValue.toString());
        }

        function asStateValue (decodedValue, typeName, separator = URL_ARRAY_SEPARATOR) {
            // console.log('asStateValue', decodedValue, typeName);
            let value = decodeURI(decodedValue);
            let stateValue;

            if (typeName.match(TYPENAME.STRING)) {
                stateValue = value;
            } else if (typeName.match(TYPENAME.NUMBER)) {
                stateValue = Number(value);
            } else if (typeName.match(TYPENAME.BOOLEAN)) {
                // console.log('boolean', stateValue, stateValue === 'T');
                stateValue = value === 'T';
            } else if (typeName.match(TYPENAME.ARRAY)) {
                if (value) {
                    let baseType = typeName.substr(0, typeName.length - ARRAY_DENOTATOR.length);
                    // Split the array, replace the split char by a tmp split char because org split char can repeat
                    const TMP_SPLIT_CHAR = '|';
                    let surroundBy = '([^' + URL_ARRAY_SEPARATOR + '])';
                    let splitOn = new RegExp(surroundBy + separator + surroundBy, 'g');
                    value = value.replace(splitOn, '$1' + TMP_SPLIT_CHAR + '$2');
                    stateValue = value
                        .split(TMP_SPLIT_CHAR)
                        .map(v => asStateValue(v, baseType, separator + URL_ARRAY_SEPARATOR));
                } else {
                    stateValue = [];
                }
            } else {
                // to be defined
            }

            // console.log('State value', decodedValue, typeName, stateValue);
            return stateValue;
        }

        function state2params (state) {
            return Object.keys(STATE_URL_CONVERSION.stateVariables).reduce((result, key) => {
                let attribute = STATE_URL_CONVERSION.stateVariables[key];
                let value = getValueForKey(state, attribute.name);
                // console.log('Value for', attribute.name, value);
                if (value !== null) {
                    // store value in url
                    if (angular.isFunction(attribute.getValue)) {
                        value = attribute.getValue(value);
                        // console.log('getValue', value);
                    }
                    result[key] = asUrlValue(value, attribute.type);
                }
                return result;
            }, {});
        }

        function params2state (oldState, params) {
            let newState = createObject (oldState, 'state', params);

            // console.log('start with state', STATE_URL_CONVERSION.initialValues.state);
            newState = Object.keys(STATE_URL_CONVERSION.stateVariables).reduce((result, key) => {
                let attribute = STATE_URL_CONVERSION.stateVariables[key];
                let value = params[key];
                if (! angular.isUndefined(value)) {
                    // store value in state
                    value = asStateValue(value, attribute.type);
                    if (angular.isFunction(attribute.setValue)) {
                        value = attribute.setValue(value);
                    }
                    setValueForKey(result, oldState, attribute.name, value);
                }
                return result;
            }, newState);

            Object.keys(STATE_URL_CONVERSION.initialValues).forEach(key => {
                if (key !== 'state' && !angular.isObject(newState[key])) {
                    newState[key] = null;
                }
            });

            Object.keys(STATE_URL_CONVERSION.post).forEach(key => {
                if (angular.isObject(newState[key])) {
                    STATE_URL_CONVERSION.post[key](oldState[key], newState[key]);
                }
            });

            return newState;
        }

        function compareObject (obj1, obj2, prefix = '') {
            if (obj1) {
                Object.keys(obj1).forEach(key => {
                    // console.log('compare key', prefix + key);
                    if (angular.isObject(obj1[key]) && angular.isObject(obj2[key])) {
                        compareObject(obj1[key], obj2[key], key + '.');
                    } else if (angular.isArray(obj1[key]) && angular.isArray(obj2[key])) {
                        // console.log('compare array', prefix + key);
                        for (let i = 0; i < obj1[key].length; i++) {
                            compareObject(obj1[key][i], obj2[key][i], key + '[' + i + '].');
                        }
                    } else if (obj1[key] !== obj2[key]) {
                        console.log('Difference on key', prefix + key, obj1[key], obj2[key]);
                    }
                });
            }
        }
    }
})();
