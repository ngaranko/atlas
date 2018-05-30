export const isFunction = (func) => typeof func === 'function';

export const isDefined = (value) => typeof value !== 'undefined';

export const isString = (value) => typeof value === 'string';

export const cloneObject = (obj) => {
  const clone = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] != null && typeof (obj[key]) === 'object') {
      clone[key] = cloneObject(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  });
  return clone;
};

