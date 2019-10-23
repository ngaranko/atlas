const dataSearchConfig = [
  {
    endpoint: 'atlas/search/openbareruimte',
    type: 'Openbare Ruimte (Weg)',
    params: {
      subtype: 'weg',
    },
  },
  {
    endpoint: 'atlas/search/adres',
    type: 'Adres',
  },
  {
    endpoint: 'atlas/search/openbareruimte',
    type: 'Openbare Ruimte',
    params: {
      subtype: 'not_weg',
    },
  },
  {
    endpoint: 'atlas/search/kadastraalobject',
    type: 'Kadastraal object',
  },
  {
    endpoint: 'meetbouten/search',
    type: 'Meetbouten',
  },
  {
    endpoint: 'monumenten/search',
    type: 'Monumenten',
  },
]

const geoSearchApiConfig = [
  {
    endpoint: 'geosearch/bag',
    type: 'bag',
  },
]

module.exports = {
  dataSearchConfig,
  geoSearchApiConfig,
}
