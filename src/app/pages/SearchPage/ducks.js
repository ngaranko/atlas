import paramsRegistry from '../../../store/params-registry'

export const REDUCER_KEY = 'SEARCH'
const SEARCH_SET_FILTERS = `${REDUCER_KEY}/SEARCH_SET_FILTERS`
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
    case SEARCH_SET_FILTERS:
      return {
        ...enrichedState,
        activeFilters: action.payload,
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

export const getQuery = ({ [REDUCER_KEY]: { query } }) => query
export const getActiveFilters = ({ [REDUCER_KEY]: { activeFilters } }) => activeFilters

export { reducer }
