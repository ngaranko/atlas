import { testSaga } from 'redux-saga-test-plan'
import { watchSearchPage, removeFilterIfNecessary } from './SearchPageSaga'
import { getActiveFilters, removeAllActiveFilters, SEARCH_REMOVE_FILTER } from './SearchPageDucks'

describe('removeFilterIfNecessary', () => {
  it('should remove the filter if the filter has no values ', () => {
    testSaga(removeFilterIfNecessary, { payload: { type: 'foo' } })
      .next()
      .select(getActiveFilters)
      .next([{ type: 'foo', values: [] }])
      .put(removeAllActiveFilters('foo'))
      .next()
      .isDone()
  })

  it('should not remove the filter if the filter has values ', () => {
    testSaga(removeFilterIfNecessary, { payload: { type: 'foo' } })
      .next()
      .select(getActiveFilters)
      .next([{ type: 'foo', values: [1, 2, 3] }])
      .isDone()
  })

  it('should not remove the filter if no matching filters', () => {
    testSaga(removeFilterIfNecessary, { payload: { type: 'foo' } })
      .next()
      .select(getActiveFilters)
      .next() // Returns no active filters
      .isDone()
  })
})

it('should watch REQUEST_NEAREST_DETAILS and call fetchPanelLayers', () => {
  testSaga(watchSearchPage)
    .next()
    .takeLatestEffect(SEARCH_REMOVE_FILTER, removeFilterIfNecessary)
    .next({})
    .next()
    .isDone()
})
