import {
  reducer,
  initialState,
  SEARCH_SET_QUERY,
  SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE,
  SEARCH_REMOVE_FILTER,
  SEARCH_ADD_FILTER,
} from './SearchPageDucks'
import paramsRegistry from '../../../store/params-registry'

jest.mock('../../../store/params-registry')

describe('should return the new state based on', () => {
  const mockInitialState = initialState

  it('no action', () => {
    const updatedState = reducer(mockInitialState, '')

    expect(updatedState).toStrictEqual(mockInitialState)
  })

  it(`the action ${[SEARCH_SET_QUERY]}`, () => {
    const updatedState = reducer(mockInitialState, { type: SEARCH_SET_QUERY, payload: 'foo' })

    expect(updatedState).toStrictEqual({ ...mockInitialState, query: 'foo' })
  })

  describe(`the action ${[SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE]}`, () => {
    const mockActiveFilters = [{ type: 'foo', values: [1, 2, 3] }]

    beforeEach(() => {
      paramsRegistry.getStateFromQueries.mockImplementationOnce(() => ({
        activeFilters: mockActiveFilters,
      }))
    })

    it('when there is no payload', () => {
      const updatedState = reducer(mockInitialState, {
        type: SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE,
        payload: null,
      })

      expect(updatedState).toStrictEqual({ ...mockInitialState, activeFilters: mockActiveFilters })
    })

    it('when there are matching active filters ', () => {
      const updatedState = reducer(mockInitialState, {
        type: SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE,
        payload: 'foo',
      })

      expect(updatedState).toStrictEqual(mockInitialState)
    })

    it('when there are no matching active filters ', () => {
      const updatedState = reducer(mockInitialState, {
        type: SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE,
        payload: 'foo2',
      })

      expect(updatedState).toStrictEqual({ ...mockInitialState, activeFilters: mockActiveFilters })
    })
  })

  describe(`the action ${[SEARCH_REMOVE_FILTER]}`, () => {
    it('when there is no payload', () => {
      const updatedState = reducer(mockInitialState, {})

      expect(updatedState).toStrictEqual(mockInitialState)
    })

    describe('when there are matching active filters ', () => {
      it('and filters is an array', () => {
        const mockActiveFilters = [{ type: 'foo', values: [1, 2, 3] }]

        paramsRegistry.getStateFromQueries.mockImplementationOnce(() => ({
          activeFilters: mockActiveFilters,
        }))

        const updatedState = reducer(mockInitialState, {
          type: SEARCH_REMOVE_FILTER,
          payload: {
            type: 'foo',
            filter: 1, // Deletes filter 1 from the filters
          },
        })

        expect(updatedState).toStrictEqual({
          ...mockInitialState,
          activeFilters: [{ type: 'foo', values: [2, 3] }], // values array loses the filter 1
        })
      })

      it('and filters is an single valye', () => {
        const mockActiveFilters = [
          {
            type: 'foo',
            values: 1,
          },
        ]

        paramsRegistry.getStateFromQueries.mockImplementationOnce(() => ({
          activeFilters: mockActiveFilters,
        }))

        const updatedState = reducer(mockInitialState, {
          type: SEARCH_REMOVE_FILTER,
          payload: {
            type: 'foo',
            filter: 1, // Deletes value 1 from the filters
          },
        })

        expect(updatedState).toStrictEqual({
          ...mockInitialState,
          activeFilters: [{ type: 'foo', values: null }], // values becomes empty as value 1 is deleted
        })
      })
    })

    it('when there are no matching active filters ', () => {
      const mockActiveFilters = [{ type: 'foo', values: [1, 2, 3] }]

      paramsRegistry.getStateFromQueries.mockImplementationOnce(() => ({
        activeFilters: mockActiveFilters,
      }))

      const updatedState = reducer(mockInitialState, {
        type: SEARCH_REMOVE_FILTER,
        payload: 'foo2',
      })

      expect(updatedState).toStrictEqual({ ...mockInitialState, activeFilters: mockActiveFilters })
    })
  })

  describe(`the action ${[SEARCH_ADD_FILTER]}`, () => {
    it('when there is no payload', () => {
      const updatedState = reducer(mockInitialState, { type: SEARCH_ADD_FILTER, payload: null })

      expect(updatedState).toStrictEqual(mockInitialState)
    })

    describe('when there are matching active filters ', () => {
      it('and filters is an array', () => {
        const mockActiveFilters = [{ type: 'foo', values: [1, 2, 3] }]

        paramsRegistry.getStateFromQueries.mockImplementation(() => ({
          activeFilters: mockActiveFilters,
        }))

        let updatedState = reducer(mockInitialState, {
          type: SEARCH_ADD_FILTER,
          payload: {
            type: 'foo',
            filter: 1, // Adds value 1 to the filters
          },
        })

        expect(updatedState).toStrictEqual({
          ...mockInitialState,
          activeFilters: mockActiveFilters, // no changes as filter 1 was already present in the values
        })

        updatedState = reducer(mockInitialState, {
          type: SEARCH_ADD_FILTER,
          payload: {
            type: 'foo',
            filter: 4, // Adds value 4 to the filters
          },
        })

        expect(updatedState).toStrictEqual({
          ...mockInitialState,
          activeFilters: [{ type: 'foo', values: [1, 2, 3, 4] }], // values array also has value 4
        })

        paramsRegistry.getStateFromQueries.mockReset()
      })

      it('and filters is a single value', () => {
        const mockActiveFilters = [{ type: 'foo', values: 1 }]

        paramsRegistry.getStateFromQueries.mockImplementationOnce(() => ({
          activeFilters: mockActiveFilters,
        }))

        let updatedState = reducer(mockInitialState, {
          type: SEARCH_ADD_FILTER,
          payload: {
            type: 'foo',
            filter: 1, // Adds value 1 to the filters
            singleValue: true,
          },
        })

        expect(updatedState).toStrictEqual({
          ...mockInitialState,
          activeFilters: mockActiveFilters, // no changes as filter 1 was already present in the values
        })

        updatedState = reducer(mockInitialState, {
          type: SEARCH_ADD_FILTER,
          payload: {
            type: 'foo',
            filter: 4, // Adds value 4 to the filters
            singleValue: true,
          },
        })

        expect(updatedState).toStrictEqual({
          ...mockInitialState,
          activeFilters: [{ type: 'foo', values: 4 }], // values array also has value 4
        })

        paramsRegistry.getStateFromQueries.mockReset()
      })
    })

    describe('when there are no matching active filters ', () => {
      const mockActiveFilters = [{ type: 'foo', values: [1, 2, 3] }]

      beforeEach(() => {
        paramsRegistry.getStateFromQueries.mockImplementationOnce(() => ({
          activeFilters: mockActiveFilters,
        }))
      })

      it('and filters is an array', () => {
        const updatedState = reducer(mockInitialState, {
          type: SEARCH_ADD_FILTER,
          payload: {
            type: 'xyz',
            filter: 1,
          },
        })

        expect(updatedState).toStrictEqual({
          ...mockInitialState,
          activeFilters: [...mockActiveFilters, { type: 'xyz', values: [1] }], // Adds new filter type
        })
      })

      it('and filters is a single value', () => {
        const updatedState = reducer(mockInitialState, {
          type: SEARCH_ADD_FILTER,
          payload: {
            type: 'xyz',
            filter: 1,
            singleValue: true,
          },
        })

        expect(updatedState).toStrictEqual({
          ...mockInitialState,
          activeFilters: [...mockActiveFilters, { type: 'xyz', values: 1 }], // Adds new filter type with single value
        })
      })
    })
  })
})
