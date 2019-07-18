import { testSaga } from 'redux-saga-test-plan'
import {
  fetchMapSearchResultsFailure,
  fetchMapSearchResultsSuccessList,
  fetchMapSearchResultsSuccessPanel,
  fetchSearchResultsByQuery,
} from '../../ducks/data-search/actions'
import {
  getSearchCategory,
  getSearchQuery,
} from '../../ducks/data-search/selectors'
import { querySearch } from '../../services/search/search'
import {
  fetchMapSearchResults,
  fetchQuerySearchResults,
  setSearchResults,
} from './data-search'
import geosearch from '../../services/search/geosearch'
import search from '../../../map/services/map-search/map-search'
import { VIEW_MODE } from '../../ducks/ui/ui'
import { getUser } from '../../ducks/user/user'
import { waitForAuthentication } from '../user/user'
import { ERROR_TYPES, setGlobalError } from '../../ducks/error/error-message'

describe('fetchMapSearchResults', () => {
  it('should do a geo search in a list view', () => {
    testSaga(fetchMapSearchResults, {})
      .next()
      .next(12) // zoom
      .next(VIEW_MODE.SPLIT) // view
      .next('location')
      .next()
      .next()
      .next('user')
      .call(geosearch, 'location', 'user')
      .next([])
      .put(fetchMapSearchResultsSuccessList([], 0))
      .next()
      .isDone()
  })

  it('should do a geo search in a map view', () => {
    testSaga(fetchMapSearchResults, {})
      .next()
      .next(12) // zoom
      .next(VIEW_MODE.MAP) // view
      .next('location')
      .next()
      .next()
      .next('user')
      .call(search, 'location', 'user')
      .next({ results: [], error: false })
      .put(fetchMapSearchResultsSuccessPanel([], 0))
      .next()
      .isDone()
  })

  it('should throw error and put error', () => {
    const error = new Error('My Error')
    testSaga(fetchMapSearchResults, {})
      .next()
      .next()
      .next()
      .next()
      .next()
      .next()
      .next()
      .throw(error)
      .put(fetchMapSearchResultsFailure(''))
      .next()
      .isDone()
  })
})

describe('fetchQuerySearchResults', () => {
  it('should do a query search', () => {
    testSaga(fetchQuerySearchResults, {})
      .next()
      .select(getSearchQuery)
      .next('query')
      .select(getSearchCategory)
      .next('category')
      .put(fetchSearchResultsByQuery('query'))
      .next()
      .call(waitForAuthentication)
      .next()
      .select(getUser)
      .next('user')
      .call(querySearch, 'query', 'category', 'user')
      .next({ results: [], errors: false })
      .call(setSearchResults, [])
      .next()
      .isDone()
  })

  it('should handle errors on a query search', () => {
    testSaga(fetchQuerySearchResults, {})
      .next()
      .select(getSearchQuery)
      .next('query')
      .select(getSearchCategory)
      .next('category')
      .put(fetchSearchResultsByQuery('query'))
      .next()
      .call(waitForAuthentication)
      .next()
      .select(getUser)
      .next('user')
      .call(querySearch, 'query', 'category', 'user')
      .next({ results: [], errors: true })
      .put(setGlobalError(ERROR_TYPES.GENERAL_ERROR))
      .next()
      .call(setSearchResults, [])
      .next()
      .isDone()
  })
})
