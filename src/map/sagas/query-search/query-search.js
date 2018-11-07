// import { takeLatest, put } from 'redux-saga/effects';
// import { fetchSearchResultsByQuery } from '../../../header/ducks/search/search';
// import { routing } from '../../../app/routes';
//
// export function* fetchSearchResults(action) {
//   const { meta = {} } = action;
//   const { zoekterm } = meta.query;
//   yield put(fetchSearchResultsByQuery(zoekterm));
// }
//
// export function* watchQuerySearch() {
//   yield takeLatest(routing.dataSearch.type, fetchSearchResults);
// } // TODO: use or remove
