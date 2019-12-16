import { put, takeLatest, select } from 'redux-saga/effects'
import { getActiveFilters, removeAllActiveFilters, SEARCH_REMOVE_FILTER } from './SearchPageDucks'

function* removeFilterIfNecessary(action) {
  const { type } = action.payload
  const activeFilters = yield select(getActiveFilters)
  if (!activeFilters[type].length) {
    put(removeAllActiveFilters(type))
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchSearchPage() {
  yield takeLatest(SEARCH_REMOVE_FILTER, removeFilterIfNecessary)
}
