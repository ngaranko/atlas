import kadastraalObject from '../../shared/services/kadastraal-object/kadastraal-object';
import bouwblok from '../../shared/services/bouwblok/bouwblok';
import meetbout from '../../shared/services/meetbout/meetbout';
import napPeilmerk from '../../shared/services/nap-peilmerk/nap-peilmerk';
import inslag from '../../shared/services/inslag/inslag';
import monument from '../../shared/services/monument/monument';
import vestiging from '../../shared/services/vestiging/vestiging';

const servicesByEndpointType = {
  'brk/object': {
    fetch: kadastraalObject
  },
  'gebieden/bouwblok': {
    fetch: bouwblok
  },
  'handelsregister/vestiging': {
    fetch: vestiging,
    authScope: 'HR/R'
  },
  'meetbouten/meetbout': {
    fetch: meetbout
  },
  'milieuthemas/explosieven/inslagen': {
    fetch: inslag
  },
  'monumenten/monumenten': {
    fetch: monument
  },
  'nap/peilmerk': {
    fetch: napPeilmerk
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
