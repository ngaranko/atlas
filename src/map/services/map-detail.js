import * as kadastraalObject from '../../shared/services/kadastraal-object/kadastraal-object';

const servicesByEndpointType = {
  'brk/object': kadastraalObject.fetchByUri
  // 'gebieden/bouwblok', // Bouwblok
  // 'handelsregister/vestiging', // Vestiging
  // 'meetbouten/meetbout', // Meetbout
  // 'milieuthemas/explosieven/inslagen', // Inslag
  // 'monumenten/monumenten', // Monument
  // 'nap/peilmerk' // NAP Peilmerk
};

export default function detail(endpoint, user) {
  const endpointType = Object.keys(servicesByEndpointType).find((type) => endpoint.includes(type));
  const fetchFn = endpointType ? servicesByEndpointType[endpointType] : null;
  return fetchFn ? fetchFn(endpoint) : null;
}
