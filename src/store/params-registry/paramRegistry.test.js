import ParamsRegistery from './paramRegistry';

describe('ParamsRegistery singleton', () => {
  let paramsRegistry;

  beforeEach(() => {
    paramsRegistry = new ParamsRegistery();
  });

  describe('Result object', function () {
    it('should return an object with a parameter and 2 routes, each bound to a reducer', () => {
      paramsRegistry
        .addParameter('map', (routes) => {
          routes
            .add('/bar', {
              reducerKey: 'reducerKey',
              stateKey: 'foo',
              decode: jest.fn(),
              encode: jest.fn()
            })
            .add('/foo/bar', {
              reducerKey: 'dataSearch',
              stateKey: 'bar'
            });
        });

      const result = paramsRegistry.result;

      const expectation = {
        map: {
          routes: {
            '/bar': {
              decode: jest.fn(),
              encode: jest.fn(),
              reducerKey: 'reducerKey',
              stateKey: 'foo',
              addHistory: false
            },
            '/foo/bar': {
              decode: (val) => val,
              encode: (val) => val,
              reducerKey: 'dataSearch',
              stateKey: 'bar',
              addHistory: false
            }
          }
        }
      };
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expectation));
    });

    it('should return an object with 2 parameters with each one route, each bound to a reducer', () => {
      const result = paramsRegistry
        .addParameter('map', (routes) => {
          routes
            .add('/bar', {
              reducerKey: 'reducerKey',
              stateKey: 'foo'
            }, true);
        })
        .addParameter('foobar', (routes) => {
          routes
            .add('/foo', {
              reducerKey: 'reducerKey',
              stateKey: 'foo'
            });
        }).result;

      const expectation = {
        map: {
          routes: {
            '/bar': {
              decode: (val) => val,
              encode: (val) => val,
              reducerKey: 'reducerKey',
              stateKey: 'foo',
              addHistory: true
            }
          }
        },
        foobar: {
          routes: {
            '/foo': {
              decode: (val) => val,
              encode: (val) => val,
              reducerKey: 'reducerKey',
              stateKey: 'foo',
              addHistory: false
            }
          }
        }
      };
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expectation));
    });

    it('should also accept an array of routes', () => {
      const result = paramsRegistry
        .addParameter('map', (routes) => {
          routes
            .add(['/bar', '/foo'], {
              reducerKey: 'reducerKey',
              stateKey: 'foo'
            }, true);
        }).result;
      expect(Object.keys(result.map.routes)).toEqual(['/bar', '/foo']);
    });

    it('should set the default value of the parameter', () => {
      const result = paramsRegistry
        .addParameter('map', (routes, setDefaultValue) => {
          setDefaultValue(false);
          routes
            .add('/bar', {
              reducerKey: 'reducerKey',
              stateKey: 'foo'
            });
        }).result;
      expect(result.map.defaultValue).toEqual(false);
    });
  });

  describe('Errors', () => {
    it('should throw an error when there is a duplicate parameter', () => {
      expect(() => paramsRegistry
        .addParameter('map', (routes) => {
          routes
            .add('/bar', {
              reducerKey: 'reducerKey',
              stateKey: 'foo'
            });
        })
        .addParameter('map', (routes) => {
          routes
            .add('/bara', {
              reducerKey: 'reducerKey2',
              stateKey: 'bar'
            });
        })).toThrow('Parameter is already registered: map');
    });

    it('should throw an error when there is a duplicate route', () => {
      expect(() => paramsRegistry
        .addParameter('map', (routes) => {
          routes
            .add('/bar', {
              reducerKey: 'reducerKey',
              stateKey: 'foo'
            })
            .add('/bar', {
              reducerKey: 'reducerKey2',
              stateKey: 'bar'
            });
        })).toThrow('Route is already registered for parameter "map" with route "/bar"');
    });
  });

  describe('setQueriesFromState method', () => {
    beforeEach(() => {
      paramsRegistry
        .addParameter('map', (routes, setDefaultValue) => {
          setDefaultValue('123');
          routes
            .add('ROUTER/bar', {
              reducerKey: 'reducerKey',
              stateKey: 'foo'
            }, true)
            .add('ROUTER/foo', {
              reducerKey: 'reducerKey2',
              stateKey: 'foo'
            });
        })
        .addParameter('anotherParam', (routes) => {
          routes
            .add('ROUTER/bar', {
              defaultValue: '321',
              reducerKey: 'reducerKey',
              stateKey: 'bar'
            });
        });

      paramsRegistry.separateHistory = {
        replace: jest.fn(),
        push: jest.fn()
      };
    });
    it('should call history.replace with the right querystring', () => {
      const state = { reducerKey2: { foo: 'hello!' } };
      paramsRegistry.setQueriesFromState('ROUTER/foo', state);
      expect(paramsRegistry.separateHistory.replace).toHaveBeenCalledWith('/?map=hello!');
    });

    it('should call history.push with the right querystring', () => {
      const state = { reducerKey: { foo: 'hello!' } };
      paramsRegistry.setQueriesFromState('ROUTER/bar', state);
      expect(paramsRegistry.separateHistory.push).toHaveBeenCalledWith('/?map=hello!');
    });

    it('should not set the query if the general defaultValue is set and equal to the encoded value', () => {
      const state = { reducerKey: { foo: '123', bar: 'bla' } };
      paramsRegistry.setQueriesFromState('ROUTER/bar', state);
      expect(paramsRegistry.separateHistory.push).toHaveBeenCalledWith('/?anotherParam=bla');
    });

    it('should not set the query if the defaultValue per route is set and equal to the encoded value', () => {
      const state = { reducerKey: { foo: '1234', bar: '321' } };
      paramsRegistry.setQueriesFromState('ROUTER/bar', state);
      expect(paramsRegistry.separateHistory.push).toHaveBeenCalledWith('/?map=1234');
    });
  });

  describe('getStateFromQueries method', () => {
    beforeEach(() => {
      paramsRegistry
        .addParameter('map', (routes) => {
          routes
            .add('ROUTER/bar', {
              reducerKey: 'reducerKey',
              stateKey: 'foo'
            })
            .add('ROUTER/foo', {
              reducerKey: 'reducerKey2',
              stateKey: 'foo'
            });
        })
        .addParameter('page', (routes) => {
          routes
            .add('ROUTER/bar', {
              reducerKey: 'reducerKey3',
              stateKey: 'pageNumber',
              decode: jest.fn()
            })
            .add('ROUTER/foo', {
              reducerKey: 'reducerKey4',
              stateKey: 'fooBar'
            });
        });
    });

    it('should return the state from the action\'s query when on right route in the right reducer', () => {
      expect(paramsRegistry.getStateFromQueries('reducerKey', {
        type: 'ROUTER/bar',
        meta: { query: { map: '123' } }
      })).toEqual({ foo: '123' });

      expect(paramsRegistry.getStateFromQueries('reducerKey4', {
        type: 'ROUTER/foo',
        meta: { query: { page: 1 } }
      })).toEqual({ fooBar: 1 });
    });

    it('should return an empty object when reducer or route don\'t match', () => {
      expect(paramsRegistry.getStateFromQueries('reducerKey3', {
        type: 'ROUTER/bar',
        meta: { query: { map: '123' } }
      })).toEqual({});

      expect(paramsRegistry.getStateFromQueries('reducerKey4', {
        type: 'ROUTER/baz',
        meta: { query: { page: 1 } }
      })).toEqual({});
    });

    it('should call the decode method when it is a match', () => {
      const decodeMock = jest.fn();
      paramsRegistry.addParameter('fu', (routes) => {
        routes
          .add('ROUTER/foo', {
            reducerKey: 'reducerKey4',
            stateKey: 'fooBar',
            decode: decodeMock
          });
      }).getStateFromQueries('reducerKey4', {
        type: 'ROUTER/foo',
        meta: { query: { fu: 'bar' } }
      });
      expect(decodeMock).toHaveBeenCalled();
    });
  });

  describe('reducer settings passed to the route', () => {
    it('should throw an error if reducerKey or stateKey is not given', () => {
      expect(() => paramsRegistry
        .addParameter('foo', (routes) => {
          routes
            .add('/bar', {
              stateKey: 'bar'
            });
        })).toThrow('Reducer settings passed to the route is missing a key: "reducerKey"');

      expect(() => paramsRegistry
        .addParameter('foo', (routes) => {
          routes
            .add('/bar', {
              reducerKey: 'reducerKey'
            });
        })).toThrow('Reducer settings passed to the route is missing a key: "stateKey"');
    });

    it('should not throw an error when reducerKey and stateKey are set', () => {
      expect(() => paramsRegistry
        .addParameter('foo', (routes) => {
          routes
            .add('/bar', {
              reducerKey: 'reducerKey',
              stateKey: 'stateKey'
            });
        })).not.toThrow();
    });

    it('should throw an error when an key is set that is other than the allowed keys', () => {
      expect(() => paramsRegistry
        .addParameter('foo', (routes) => {
          routes
            .add('/bar', {
              foo: 'reducerKey',
              reducerKey: 'reducerKey',
              stateKey: 'stateKey'
            });
        })).toThrow('Key given to reducer settings is not allowed: "foo"');
    });
  });
});
