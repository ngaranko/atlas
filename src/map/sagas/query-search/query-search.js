import { takeLatest, put } from 'redux-saga/effects';
import { fetchSearchResultsByQuery } from '../../../header/ducks/search/search';
import { routing } from '../../../app/routes';

export function* fetchSearchResults(action) {
  const { query } = action.payload;
  yield put(fetchSearchResultsByQuery(query));
}

export function* watchQuerySearch() {
  yield takeLatest(routing.searchData.type, fetchSearchResults);
}
