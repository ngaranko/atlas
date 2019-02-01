import { put, select } from 'redux-saga/effects';
import { fetchDetail as fetchDetailActionCreator } from '../../shared/ducks/detail/actions';
import { pageTypeToEndpoint } from '../../store/redux-first-router/actions';
import { getDetail } from '../../shared/ducks/detail/selectors';
import { getUserScopes } from '../../shared/ducks/user/user';
import { getTemplateUrl, getParts } from '../services/endpoint-parser/endpoint-parser';
import { getApiSpecificationData } from '../../shared/ducks/datasets/datasets';
import formatDetailData from '../services/data-formatter/data-formatter';
import { getByUrl } from '../../shared/services/api/api';

/* istanbul ignore next */
export function* fetchDetail() {
  const { type, subtype, id } = yield select(getDetail);
  const endpoint = pageTypeToEndpoint(type, subtype, id);
  const fetchAction = fetchDetailActionCreator(endpoint);
  yield put(fetchAction);
}

export function* getDetailData(endpoint, mapDetail) {
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

  // TODO console.log('append version=3 to grondexploitaties');
  const endpointVersion = category === 'grondexploitatie' ? '?version=3' : '';
  const catalogFilters = yield select(getApiSpecificationData);

  // TODO replace this call with mapDetail value
  const data = yield getByUrl(`${endpoint}${endpointVersion}`);
  const formatedData = {
    ...mapDetail,
    ...formatDetailData(data, category, subject, catalogFilters, scopes)
    // ...mapDetail
  };

  return {
    includeSrc,
    data: formatedData,
    filterSelection: {
      [subject]: formatedData.naam
    }
  };
}

/* istanbul ignore next */ // TODO: refactor, test
export default function* watchDetailRoute() {
  // yield takeLatest([routing.dataDetail.type], fetchDetail);
}
