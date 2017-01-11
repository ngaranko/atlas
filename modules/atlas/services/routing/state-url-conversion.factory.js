(function () {
    'use strict';

    angular
        .module('atlas')
        .factory('stateUrlConverter', stateUrlConverterFactory);

    stateUrlConverterFactory.$inject = ['STATE_URL_CONVERSION'];

    function stateUrlConverterFactory (STATE_URL_CONVERSION) {
        const URL_ARRAY_SEPARATOR = ':';

        return {
            state2params,
            params2state,
            compareObject
        };

        function getValueForKey (obj, key) {
            let dot = key.indexOf('.');
            if (dot > 0) {
                let pre = key.substr(0, dot),
                    post = key.substr(dot + 1);
                return angular.isObject(obj[pre]) ? getValueForKey(obj[pre], post) : null;
            } else {
                return obj[key] || null;
            }
        }

        function createObject (oldState, obj, key) {
            let newObj = angular.copy(STATE_URL_CONVERSION.initialize[key]) || {};

            if (angular.isFunction(STATE_URL_CONVERSION.pre[key])) {
                newObj = STATE_URL_CONVERSION.pre[key](oldState[key], newObj);
            }
            return newObj;
        }

        function setValueForKey (obj, oldState, key, value) {
            let dot = key.indexOf('.');
            if (dot > 0) {
                let pre = key.substr(0, dot),
                    post = key.substr(dot + 1);
                obj[pre] = obj[pre] || createObject(oldState, obj, pre);
                setValueForKey(obj[pre], oldState, post, value);
            } else {
                obj[key] = value;
            }
        }

        function asUrlValue (value, typeName, separator = URL_ARRAY_SEPARATOR) {
            // console.log('asUrlValue', value, typeName, separator);
            let urlValue;

            if (typeName.match(/^string$/)) {
                urlValue = value;
            } else if (typeName.match(/^number$/)) {
                urlValue = value;
            } else if (typeName.match(/^boolean$/)) {
                urlValue = value ? 'T' : 'F';
            } else if (typeName.match(/\[\]$/)) {
                let baseType = typeName.substr(0, typeName.length - 2);
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

            if (typeName.match(/^string$/)) {
                stateValue = value;
            } else if (typeName.match(/^number$/)) {
                stateValue = Number(value);
            } else if (typeName.match(/^boolean$/)) {
                // console.log('boolean', stateValue, stateValue === 'T');
                stateValue = value === 'T';
            } else if (typeName.match(/\[\]$/)) {
                if (value) {
                    let baseType = typeName.substr(0, typeName.length - 2);
                    let surroundBy = '([^' + URL_ARRAY_SEPARATOR + '])';
                    let splitOn = new RegExp(surroundBy + separator + surroundBy, 'g');
                    value = value.replace(splitOn, '$1|$2');
                    stateValue = value
                        .split('|')
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

        function postProcess (oldState, newState) {
            Object.keys(STATE_URL_CONVERSION.post).forEach(key => {
                if (angular.isObject(newState[key])) {
                    STATE_URL_CONVERSION.post[key](oldState[key], newState[key]);
                }
            });
        }

        function params2state (oldState, params) {
            // console.log('start with state', STATE_URL_CONVERSION.initialize.state);
            let newState = Object.keys(STATE_URL_CONVERSION.stateVariables).reduce((result, key) => {
                let attribute = STATE_URL_CONVERSION.stateVariables[key];
                let value = params[key];
                if (angular.isUndefined(value)) {
                    // console.log('No value for', attribute.name);
                    // if (attribute.default !== undefined) {
                    //     // console.log('Set default value for', attribute.name, attribute.default);
                    //     setValueForKey(result, attribute.name, attribute.default);
                    // }
                } else {
                    // store value in state
                    value = asStateValue(value, attribute.type);
                    if (angular.isFunction(attribute.setValue)) {
                        value = attribute.setValue(value);
                    }
                    setValueForKey(result, oldState, attribute.name, value);
                }
                return result;
            }, angular.copy(STATE_URL_CONVERSION.initialize.state));

            Object.keys(STATE_URL_CONVERSION.initialize).forEach(key => {
                if (key !== 'state' && !angular.isObject(newState[key])) {
                    newState[key] = null;
                }
            });

            postProcess (oldState, newState);

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
