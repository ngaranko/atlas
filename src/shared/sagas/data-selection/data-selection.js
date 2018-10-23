import { takeLatest, put } from 'redux-saga/effects';
import { SET_DATA_SELECTION_GEOMETRY_FILTER } from '../../ducks/data-selection/data-selection';
import { routing } from '../../../app/routes';

function* showResultPage() {
  yield put({
    type: routing.adressen.type,
    meta: {
      query: {
        kaart: ''
      }
    }
  });
}

export default function* watchGeometryFilter() {
  yield takeLatest(SET_DATA_SELECTION_GEOMETRY_FILTER, showResultPage);
}
