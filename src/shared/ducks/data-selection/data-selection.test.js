import reducer from './reducer';
import * as actionCreators from './actions';
import { routing } from '../../../app/routes';
import { getStateFromQuery } from '../../../store/query-synchronization';

jest.mock('../../../store/query-synchronization');

// Todo: discuss if we should simplify this and make it less "magic".
// Handy for now, as we do not need to copy-paste almost the same tests

describe('Reducer', () => {
  beforeEach(() => {
    getStateFromQuery.mockImplementation(() => ({
      foo: 'bar'
    }));
  });

  /**
   * Create the expectations what the actions would do here:
   * - the key: this should be the name of the actionCreator function,
   * derived from the actionCreators you imported. use actionCreators[actionCreator].name to bind
   * the actionCreator to it's function name
   *
   * - expectedKeysToChange: the keys in the reducer you expect to change
   * - payload
   * - [initialState]: used to pass the initial reducer state to test
  */
  const customExpectations = {
    [routing.addresses.type]: {
      expectedKeysToChange: ['dataset', 'foo'],
      payload: [
        {
          meta: {
            query: {}
          }
        }
      ]
    },
    [routing.establishments.type]: {
      expectedKeysToChange: ['dataset', 'view'],
      payload: [
        {
          meta: {}
        }
      ]
    },
    [routing.cadastralObjects.type]: {
      expectedKeysToChange: ['dataset', 'view'],
      payload: [
        {
          meta: {}
        }
      ]
    }
  };

  const expectations = {
    [actionCreators.fetchDataSelection.name]: { // action creator
      expectedKeysToChange: ['isLoading', 'markers'],
      payload: [],
      initialState: {
        isLoading: true
      }
    },
    [actionCreators.setMarkers.name]: {
      expectedKeysToChange: ['markers', 'isLoading'],
      payload: [
        [{ markers: [] }]
      ]
    },
    [actionCreators.setPage.name]: {
      expectedKeysToChange: ['page'],
      payload: [
        1
      ]
    },
    [actionCreators.setView.name]: {
      expectedKeysToChange: ['view'],
      payload: [
        'map'
      ]
    },
    [actionCreators.setDataset.name]: {
      expectedKeysToChange: ['dataset'],
      payload: [
        'foobar'
      ]
    },
    [actionCreators.setGeometryFilter.name]: {
      expectedKeysToChange: ['geometryFilter'],
      payload: [
        [{ filter: 'foo' }]
      ]
    },
    [actionCreators.receiveDataSelectionSuccess.name]: {
      expectedKeysToChange: ['isLoading', 'markers', 'errorMessage', 'authError', 'data'],
      payload: [
        { data: { some: 'data' } }
      ]
    },
    [actionCreators.receiveDataSelectionFailure.name]: {
      expectedKeysToChange: [
        'isLoading',
        'authError',
        'errorMessage',
        'dataset',
        'results',
        'markers'
      ],
      payload: [{
        error: 'error message'
      }]
    },
    ...customExpectations
  };

  // Note: from here we do not need to customize our test
  const otherActionCreators = Object.keys(customExpectations).reduce((acc, type) => ({
    ...acc,
    [type]: (args) => ({
      type,
      ...args
    })
  }), {});

  const actions = { ...actionCreators, ...otherActionCreators };

  Object.keys(actions).forEach((actionCreator) => {
    const { payload, expectedKeysToChange, initialState = {} } = expectations[actionCreator];
    it(`should set ${expectedKeysToChange.join(', ')} state when dispatching ${actionCreator}`, () => {
      const action = actions[actionCreator](...payload);
      const result = reducer(initialState, action);
      expect(result).toMatchSnapshot();

      // Check if every key is changed, not more or less than the expected keys to change
      expect(expectedKeysToChange.every((key) => Object.keys(result).includes(key))).toBe(true);
      expect(Object.keys(result).every((key) => expectedKeysToChange.includes(key))).toBe(true);
    });
  });
});
