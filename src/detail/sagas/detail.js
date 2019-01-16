import marked from 'marked';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { routing } from '../../app/routes';
import { fetchDetail as fetchDetailActionCreator, fetchDetailSuccess, fetchDetailFailure } from '../../shared/ducks/detail/actions';
import { pageTypeToEndpoint } from '../../store/redux-first-router/actions';
import { getDetail } from '../../shared/ducks/detail/selectors';
import { FETCH_DETAIL_REQUEST } from '../../shared/ducks/detail/constants';
import { getUserScopes } from '../../shared/ducks/user/user';
import { getByUrl } from '../../shared/services/api/api';
import { getTemplateUrl, getParts } from '../services/endpoint-parser/endpoint-parser';
import { getApiSpecificationData } from '../../shared/ducks/datasets/datasets';

/* istanbul ignore next */
export function* fetchDetail() {
  const { type, subtype, id } = yield select(getDetail);
  const endpoint = pageTypeToEndpoint(type, subtype, id);
  const fetchAction = fetchDetailActionCreator(endpoint);
  yield put(fetchAction);
}

function formatCatalogData(data, catalogFilters) {
  const resourceTypes = catalogFilters.resourceTypes;
  if (!resourceTypes || !data) {
    return {};
  }
  const resources = data['dcat:distribution'];

  const formattedData = {
    _display: data['dct:title'],
    resources: resourceTypes.map((item) => ({
      type: item.id,
      rows: resources.filter((row) => row['ams:resourceType'] === item.id)
    })).filter((resource) => resource.rows.length),
    editDatasetId: data['dct:identifier']
  };

  return Object.keys(data).filter((key) => key !== 'dcat:distribution')
      .reduce((result, key) => ({
        ...result,
        [key]: data[key]
      }), formattedData);
}

function formatData(data, subject, catalogFilters) {
  switch (subject) {
    case 'datasets': // dcat data
      return formatCatalogData(data, catalogFilters);
    default:
      return data;
  }
}

const formatDetailData = (rawData, category, subject, catalogFilters, scopes) => {
  let data = formatData(rawData, subject, catalogFilters);
  if (category === 'dcatd' && subject === 'datasets') {
    const fields = ['dct:description', 'overheid:grondslag', 'overheidds:doel'];
    const markdownFields = fields.reduce((acc, field) => {
      if (data[field]) {
        acc[field] = marked(data[field]);
      }
      return acc;
    }, {});

    data = { ...data, ...markdownFields };

    data.canEditDataset = scopes.includes('CAT/W');
  }
  return data;
};

export function* getData(endpoint) {
  const includeSrc = getTemplateUrl(endpoint);
  const [category, subject] = getParts(endpoint);

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
    // }
    // else if (category === 'dcatd' && subject === 'datasets' && !vm.catalogFilters) {
    //     // The catalogFilters data is not present so do not fetch data
    //     delete vm.apiData;
    //     errorHandler();
  }
  const endpointVersion = category === 'grondexploitatie' ? '?version=3' : '';
  const data = yield getByUrl(`${endpoint}${endpointVersion}`);
  const catalogFilters = yield select(getApiSpecificationData);
  return {
    includeSrc,
    data: formatDetailData(data, category, subject, catalogFilters, scopes)
  };
  // getByUrl(`${endpoint}${endpointVersion}`).then(function (data) {
  //     data = dataFormatter.formatData(data, subject, vm.catalogFilters);

  //         if (category === 'dcatd' && subject === 'datasets') {
  //             const fields = ['dct:description', 'overheid:grondslag', 'overheidds:doel'];
  //             const markdownFields = fields.reduce((acc, field) => {
  //                 if (data[field]) {
  //                     acc[field] = markdownParser.parse(data[field]);
  //                 }
  //                 return acc;
  //             }, {});

  //             data = { ...data, ...markdownFields };

  //             data.canEditDataset = vm.user.scopes.includes('CAT/W');
  //         }

  //         vm.apiData = {
  //             results: data
  //         };

  //         vm.filterSelection = {
  //             [subject]: vm.apiData.results.naam
  //         };
  //     }, errorHandler);
}

export function* retrieveDetailData(action) {
  try {
    const data = yield call(getData, action.payload.endpoint);
    yield put(fetchDetailSuccess(data));
  } catch (error) {
    yield put(fetchDetailFailure(error));
  }
}


/* istanbul ignore next */ // TODO: refactor, test
export default function* watchDetailRoute() {
  yield takeLatest([routing.dataDetail.type], fetchDetail);
  yield takeLatest(FETCH_DETAIL_REQUEST, retrieveDetailData);
}

