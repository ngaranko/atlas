import paramsRegistry from '../../../store/params-registry'

export const REDUCER_KEY = 'search'
const SEARCH_ADD_FILTER = `${REDUCER_KEY}/SEARCH_ADD_FILTER`
export const SEARCH_REMOVE_FILTER = `${REDUCER_KEY}/SEARCH_REMOVE_FILTER`
const SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE = `${REDUCER_KEY}/SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE`
const SEARCH_SET_QUERY = `${REDUCER_KEY}/SET_QUERY`

const initialState = {
  activeFilters: [],
  enumList: [],
  query: '',
}

function reducer(state = initialState, action) {
  const enrichedState = {
    ...state,
    ...paramsRegistry.getStateFromQueries(REDUCER_KEY, action),
  }

  switch (action.type) {
    case SEARCH_ADD_FILTER: {
      const { type, filter, singleValue } = action.payload
      const existingFilter = !!enrichedState.activeFilters.find(({ type: _type }) => _type === type)

      const activeFilters = existingFilter
        ? enrichedState.activeFilters.map(({ type: activeType, values: activeValues }) => {
            const newValues = singleValue ? filter : [...activeValues, filter]
            return {
              type: activeType,
              values: activeType === type ? newValues : activeValues,
            }
          })
        : [
            ...enrichedState.activeFilters,
            {
              type,
              values: singleValue ? filter : [filter],
            },
          ]

      return {
        ...enrichedState,
        activeFilters,
      }
    }

    case SEARCH_REMOVE_FILTER: {
      const { type, filter } = action.payload
      const activeFilters = enrichedState.activeFilters.map(({ type: _type, values: _values }) =>
        type !== _type
          ? {
              type: _type,
              values: _values,
            }
          : {
              type: _type,
              values: Array.isArray(_values)
                ? _values.filter(currentFilter => currentFilter !== filter)
                : null,
            },
      )
      return {
        ...enrichedState,
        activeFilters,
      }
    }

    case SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE: {
      const activeFilters = enrichedState.activeFilters.filter(
        currentFilter => action.payload !== currentFilter.type,
      )

      return {
        ...enrichedState,
        activeFilters,
      }
    }

    case SEARCH_SET_QUERY:
      return {
        ...enrichedState,
        query: action.payload,
      }

    default:
      return enrichedState
  }
}

export const setQuery = payload => ({
  type: SEARCH_SET_QUERY,
  payload,
})

export const addActiveFilter = (type, filter, singleValue = false) => ({
  type: SEARCH_ADD_FILTER,
  payload: {
    type,
    filter,
    singleValue,
  },
})

export const removeActiveFilter = (type, filter) => ({
  type: SEARCH_REMOVE_FILTER,
  payload: {
    type,
    filter,
  },
})

export const removeAllActiveFilters = type => ({
  type: SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE,
  payload: type,
})

export const getQuery = ({ [REDUCER_KEY]: { query } }) => query
export const getActiveFilters = ({ [REDUCER_KEY]: { activeFilters } }) => activeFilters

export { reducer }
