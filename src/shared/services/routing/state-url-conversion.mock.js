const mockedStateUrlConversion = {
  onCreate: {},
  post: {},
  initialValues: {},
  stateVariables: {
    s: {
      name: 's',
      type: 'string'
    },
    b: {
      name: 'x.b',
      type: 'boolean'
    },
    n: {
      name: 'x.y.n',
      type: 'number'
    },
    n1: {
      name: 'x.y.n1',
      type: 'number',
      precision: 1
    },
    b62: {
      name: 'x.y.z.b62',
      type: 'base62',
      precision: 1
    },
    as: {
      name: 'as',
      type: 'string[]'
    },
    aab: {
      name: 'aab',
      type: 'boolean[][]'
    },
    aaan: {
      name: 'aaan',
      type: 'number[][][]'
    },
    kv: {
      name: 'kv',
      type: 'keyvalues'
    },
    dsf: {
      name: 'filters',
      type: 'keyvalues'
    },
    osb: {
      name: 'osb',
      type: 'object(id:string,isVisible:boolean)'
    },
    oss: {
      name: 'oss',
      type: 'object(id:string,value:string)'
    },
    v: {
      name: 'v',
      type: 'string',
      getValue: (v) => `getValue.${v}`,
      setValue: (v) => `setValue.${v}`
    },
    dte: {
      name: 'detail.endpoint',
      type: 'string'
    }
  }
};

export default mockedStateUrlConversion;
