import { call, put, takeLatest } from 'redux-saga/effects';

import autoSuggestSearch from '../../services/auto-suggest/auto-suggest';

function* fetchSuggestions(action) {
  try {
    const suggestions = yield call(autoSuggestSearch, action.query);
    yield put({ type: 'FETCH_SUGGESTIONS_SUCCESS', suggestions });
  } catch (error) {
    yield put({ type: 'FETCH_SUGGESTIONS_FAILURE', error });
  }
}

export default function* watchFetchSuggestions() {
  yield takeLatest('FETCH_SUGGESTIONS_REQUEST', fetchSuggestions);
}
