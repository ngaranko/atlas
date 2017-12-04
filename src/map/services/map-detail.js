import * as kadastraalObject from '../../shared/services/kadastraal-object/kadastraal-object';
import * as bouwblok from '../../shared/services/bouwblok/bouwblok';
import * as meetbout from '../../shared/services/meetbout/meetbout';
import * as napPeilmerk from '../../shared/services/nap-peilmerk/nap-peilmerk';
import * as inslag from '../../shared/services/inslag/inslag';
import * as monument from '../../shared/services/monument/monument';

const servicesByEndpointType = {
  'brk/object': kadastraalObject.fetchByUri,
  'gebieden/bouwblok': bouwblok.fetchByUri,
  // 'handelsregister/vestiging', // Vestiging
  'meetbouten/meetbout': meetbout.fetchByUri,
  'milieuthemas/explosieven/inslagen': inslag.fetchByUri,
  'monumenten/monumenten': monument.fetchByUri,
  'nap/peilmerk': napPeilmerk.fetchByUri
};

export default function detail(endpoint, user) {
  const endpointType = Object.keys(servicesByEndpointType).find((type) => endpoint.includes(type));
  const fetchFn = endpointType ? servicesByEndpointType[endpointType] : null;
  return fetchFn ? fetchFn(endpoint) : null;
}
