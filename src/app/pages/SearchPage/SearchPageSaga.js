import { put, takeLatest, select } from 'redux-saga/effects'
import { getActiveFilters, removeAllActiveFilters, SEARCH_REMOVE_FILTER } from './SearchPageDucks'

// We don't want a key with an empty array in the filters.
function* removeFilterIfNecessary(action) {
  const { type } = action.payload
  const activeFilters = yield select(getActiveFilters)
  if (!activeFilters.find(({ type: _type }) => type === _type).values.length) {
    yield put(removeAllActiveFilters(type))
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* watchSearchPage() {
  yield takeLatest(SEARCH_REMOVE_FILTER, removeFilterIfNecessary)
}
