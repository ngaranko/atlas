  // http://jsperf.com/isobject4
  const isObject = (value) => value !== null && typeof value === 'object';
  export default isObject;
