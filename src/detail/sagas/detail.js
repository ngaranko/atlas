import { call, put, select, takeLatest } from 'redux-saga/effects';
import { routing } from '../../app/routes';
import { fetchDetail as fetchDetailActionCreator, fetchDetailSuccess, fetchDetailFailure } from '../../shared/ducks/detail/actions';
import { pageTypeToEndpoint, toNotFoundPage } from '../../store/redux-first-router/actions';
import { getDetail } from '../../shared/ducks/detail/selectors';
import { FETCH_DETAIL_REQUEST } from '../../shared/ducks/detail/constants';
import { getUserScopes } from '../../shared/ducks/user/user';
import { getByUrl } from '../../shared/services/api/api';
import { getTemplateUrl, getParts } from '../services/endpoint-parser/endpoint-parser';
import { getApiSpecificationData } from '../../shared/ducks/datasets/datasets';
import formatDetailData from '../services/data-formatter/data-formatter';

/* istanbul ignore next */
export function* fetchDetail() {
  const { type, subtype, id } = yield select(getDetail);
  const endpoint = pageTypeToEndpoint(type, subtype, id);
  const fetchAction = fetchDetailActionCreator(endpoint);
  yield put(fetchAction);
}

export function* getData(endpoint) {
  const includeSrc = getTemplateUrl(endpoint);
  const [category, subject] = getParts(endpoint);

 // TODO ensure api specification
  const scopes = yield select(getUserScopes);

  if ((category === 'brk' && subject === 'subject' && !scopes.includes('BRK/RS')) ||
    (category === 'handelsregister' && !scopes.includes('HR/R')) ||
    (category === 'grondexploitatie' && !scopes.includes('GREX/R'))
  ) {
    // User is not authorized to view
    //   BRK Kadastrale Subjecten, nor
    //   handelsregister, nor
    //   grondexploitatie
    // so do not fetch data
    return {};
  }
  const endpointVersion = category === 'grondexploitatie' ? '?version=3' : '';
  const catalogFilters = yield select(getApiSpecificationData);
  const data = yield getByUrl(`${endpoint}${endpointVersion}`);
  const formatedData = formatDetailData(data, category, subject, catalogFilters, scopes);
  return {
    includeSrc,
    data: formatedData,
    filterSelection: {
      [subject]: formatedData.naam
    }
  };
}

export function* retrieveDetailData(action) {
  try {
    const data = yield call(getData, action.payload.endpoint);
    yield put(fetchDetailSuccess(data));
  } catch (error) {
    console.error(error); // eslint-disable-line no-console, angular/log
    if (error && error.status === 404) {
      yield put(toNotFoundPage());
    } else {
      yield put(fetchDetailFailure(error));
    }
  }
}

/* istanbul ignore next */ // TODO: refactor, test
export default function* watchDetailRoute() {
  yield takeLatest([routing.dataDetail.type], fetchDetail);
  yield takeLatest(FETCH_DETAIL_REQUEST, retrieveDetailData);
}
