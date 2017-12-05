import * as kadastraalObject from '../../shared/services/kadastraal-object/kadastraal-object';
import * as bouwblok from '../../shared/services/bouwblok/bouwblok';
import * as meetbout from '../../shared/services/meetbout/meetbout';
import * as napPeilmerk from '../../shared/services/nap-peilmerk/nap-peilmerk';
import * as inslag from '../../shared/services/inslag/inslag';
import * as monument from '../../shared/services/monument/monument';
import * as vestiging from '../../shared/services/vestiging/vestiging';

const servicesByEndpointType = {
  'brk/object': {
    fetch: kadastraalObject.fetchByUri
  },
  'gebieden/bouwblok': {
    fetch: bouwblok.fetchByUri
  },
  'handelsregister/vestiging': {
    fetch: vestiging.fetchByUri,
    authScope: 'HR/R'
  },
  'meetbouten/meetbout': {
    fetch: meetbout.fetchByUri
  },
  'milieuthemas/explosieven/inslagen': {
    fetch: inslag.fetchByUri
  },
  'monumenten/monumenten': {
    fetch: monument.fetchByUri
  },
  'nap/peilmerk': {
    fetch: napPeilmerk.fetchByUri
  }
};

export default function detail(endpoint, user) {
  const endpointType = Object.keys(servicesByEndpointType).find((type) => endpoint.includes(type));
  const endpointConfig = endpointType && servicesByEndpointType[endpointType];
  const fetchFn = endpointConfig && endpointConfig.fetch;
  const authScope = endpointConfig && endpointConfig.authScope;
  return fetchFn && (!authScope || user.scopes.includes(authScope)) &&
    fetchFn(endpoint);
}
