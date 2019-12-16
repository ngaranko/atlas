import paramsRegistry from '../../../store/params-registry'

export const REDUCER_KEY = 'search'
const SEARCH_SET_FILTERS = `${REDUCER_KEY}/SEARCH_SET_FILTERS`
const SEARCH_ADD_FILTER = `${REDUCER_KEY}/SEARCH_ADD_FILTER`
export const SEARCH_REMOVE_FILTER = `${REDUCER_KEY}/SEARCH_REMOVE_FILTER`
const SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE = `${REDUCER_KEY}/SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE`
const SEARCH_SET_QUERY = `${REDUCER_KEY}/SET_QUERY`

const initialState = {
  activeFilters: {},
  query: '',
}

function reducer(state = initialState, action) {
  const enrichedState = {
    ...state,
    ...paramsRegistry.getStateFromQueries(REDUCER_KEY, action),
  }

  switch (action.type) {
    case SEARCH_SET_FILTERS: {
      const { type, filters } = action.payload
      let activeFilters

      if (filters.length) {
        activeFilters = {
          ...enrichedState.activeFilters,
          [type]: filters,
        }
      } else {
        // Don't mutate enrichedState
        const currentActiveFilters = { ...enrichedState }
        delete currentActiveFilters.activeFilters[type]
        ;({ activeFilters } = currentActiveFilters)
      }
      return {
        ...enrichedState,
        activeFilters,
      }
    }

    case SEARCH_ADD_FILTER: {
      const { type, filter, singleValue } = action.payload
      const activeFilters = Object.assign(enrichedState.activeFilters, {
        [type]: singleValue ? [filter] : [...(enrichedState.activeFilters[type] || []), filter],
      })

      return {
        ...enrichedState,
        activeFilters,
      }
    }

    case SEARCH_REMOVE_FILTER: {
      const { type, filter } = action.payload
      const activeFilters = Object.assign(enrichedState.activeFilters, {
        [type]: (enrichedState.activeFilters[type] || []).filter(
          currentFilter => currentFilter !== filter,
        ),
      })
      return {
        ...enrichedState,
        activeFilters,
      }
    }

    case SEARCH_REMOVE_ALL_FILTERS_FROM_TYPE: {
      // Don't mutate enrichedState
      const currentActiveFilters = { ...enrichedState }
      delete currentActiveFilters.activeFilters[action.payload]
      const { activeFilters } = currentActiveFilters

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

export const setActiveFilters = payload => ({
  type: SEARCH_SET_FILTERS,
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
