import { put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_DATA_SELECTION_FAILURE,
  FETCH_MARKERS_FAILURE
} from '../../ducks/data-selection/constants';
import { FETCH_API_SPECIFICATION_FAILURE } from '../../ducks/datasets/apiSpecification/apiSpecification';
import { ERROR_TYPES, setGlobalError } from '../../ducks/error/error-message';
import { FETCH_DATASETS_FAILURE } from '../../ducks/datasets/data/data';
import {
  FETCH_GEO_SEARCH_RESULTS_FAILURE,
  FETCH_QUERY_SEARCH_MORE_RESULTS_FAILURE,
  FETCH_QUERY_SEARCH_RESULTS_FAILURE
} from '../../ducks/data-search/constants';
import { FETCH_PANORAMA_ERROR } from '../../../panorama/ducks/constants';

export function* setErrorsEffect() {
  yield put(setGlobalError(ERROR_TYPES.GENERAL_ERROR));
}

export default function* watchErrors() {
  yield takeLatest([
    FETCH_MARKERS_FAILURE,
    FETCH_API_SPECIFICATION_FAILURE,
    FETCH_DATA_SELECTION_FAILURE,
    FETCH_DATASETS_FAILURE,
    FETCH_GEO_SEARCH_RESULTS_FAILURE,
    FETCH_PANORAMA_ERROR,
    FETCH_QUERY_SEARCH_RESULTS_FAILURE,
    FETCH_QUERY_SEARCH_MORE_RESULTS_FAILURE
  ], setErrorsEffect);
}