import { useCallback, useEffect, useReducer } from 'react'
import { useQuery } from 'urql'
import { QUERY_TYPES } from '../pages/SearchPage/config'

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

const getInitialState = (limit = 50, from = 0) => ({
  aggregatedResults: [],
  results: [],
  fetchingMore: false,
  hasMore: false,
  from,
  totalCount: 0,
  limit,
  filters: [],
})

const RESET = 'RESET'
const SET_RESULTS = 'SET_RESULTS'
const SET_SHOW_MORE = 'SET_SHOW_MORE'
const SET_LIMIT = 'SET_LIMIT'

const reducer = (state, action) => {
  switch (action.type) {
    case RESET:
      return {
        ...action.payload,
      }

    case SET_LIMIT: {
      const limit = action.payload
      return {
        ...state,
        limit,
        from: state.from + limit,
        fetchingMore: limit > 0,
      }
    }

    case SET_SHOW_MORE:
      return {
        ...state,
        hasMore: action.payload,
      }

    case SET_RESULTS: {
      const { totalCount, results: newResults, filters } = action.payload

      let results = newResults

      if (state.fetchingMore) {
        // Results can be an object (direct results) or an array with results.
        results = state.results[0].results
          ? state.results.map(dataResult => {
              const matchedResult = newResults.find(result => result.type === dataResult.type)
              return {
                ...dataResult,
                results: [...dataResult.results, ...matchedResult.results],
              }
            })
          : [...state.results, ...newResults]
      }

      return {
        ...state,
        results,
        totalCount,
        filters,
        fetchingMore: false,
      }
    }

    default:
      throw new Error(`Dispatched an unknown action: ${action.type}`)
  }
}

const usePagination = (config, input, limit, initialFrom) => {
  const initialState = getInitialState(limit, initialFrom)
  const [{ totalCount, hasMore, results, filters, from, fetchingMore }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const [{ fetching, data, error }] = useQuery({
    query: config.query,
    variables: { limit, from, ...input },
  })

  // Reset the state when changing the query or filters
  useEffect(() => {
    dispatch({ type: RESET, payload: initialState })
  }, [config.query, input.filters])

  // Side-effect to show the "show more" button in the UI
  useEffect(() => {
    dispatch({ type: SET_SHOW_MORE, payload: !(totalCount <= limit + from) })
  }, [totalCount, limit, from])

  const fetchMore = useCallback(() => {
    dispatch({ type: SET_LIMIT, payload: limit })
  }, [limit])

  useEffect(() => {
    if (data && !fetching) {
      // Todo: Check if this logic should be placed elsewhere, like by creating a specific query for the totalsearch
      if (Array.isArray(config.resolver)) {
        const allCounts = config.resolver.map(key => data[key] && data[key].totalCount)
        dispatch({
          type: SET_RESULTS,
          payload: {
            totalCount: allCounts.reduce((acc, cur) => acc + cur),
            results: config.resolver.map(key => {
              const type = getKeyByValue(QUERY_TYPES, key)
              const { results: dataResults = [], totalCount: dataTotalCount } = data[key]

              return { type, results: dataResults, totalCount: dataTotalCount, filters: [] }
            }),
            filters: [],
          },
        })
      }

      if (data[config.resolver]) {
        const {
          results: dataResults = [],
          totalCount: dataTotalCount,
          filters: dataFilters = [],
        } = data[config.resolver]
        dispatch({
          type: SET_RESULTS,
          payload: {
            totalCount: dataTotalCount,
            results: dataResults,
            filters: dataFilters,
          },
        })
      }
    }
  }, [data, fetching, config.resolver])

  return {
    fetching,
    error,
    totalCount,
    results,
    filters,
    fetchMore,
    hasMore,
    fetchingMore,
  }
}

export default usePagination
