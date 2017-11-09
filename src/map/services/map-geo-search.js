const apiUrl = 'https://api.data.amsterdam.nl/';

const endpoints = [
  {
    uri: 'geosearch/nap/',
    radius: 25
  }, {
    uri: 'geosearch/atlas/'
  }, {
    uri: 'geosearch/munitie/'
  }, {
    uri: 'geosearch/bominslag/',
    radius: 25
  }, {
    uri: 'geosearch/monumenten/',
    radius: 25
  }
];

const categoryLabels = {
  openbareRuimte: 'Openbare ruimte',
  pand: 'Pand',
  standplaats: 'Standplaats',
  ligplaats: 'Ligplaats',
  kadastraalObject: 'Kadastraal object',
  gemeentelijkeBeperking: 'Gemeentelijke beperking',
  gebied: 'Gebied',
  meetbout: 'Meetbout',
  napPijlmerk: 'NAP Peilmerk',
  explosief: 'Explosief',
  monument: 'Monument'
};

const categoryLabelsByType = {
  'bag/openbareruimte': categoryLabels.openbareRuimte,
  'bag/pand': categoryLabels.pand,
  'bag/standplaats': categoryLabels.standplaats,
  'bag/ligplaats': categoryLabels.ligplaats,
  'kadaster/kadastraal_object': categoryLabels.kadastraalObject,
  'wkpb/beperking': categoryLabels.gemeentelijkeBeperking,
  'gebieden/grootstedelijkgebied': categoryLabels.gebied,
  'gebieden/unesco': categoryLabels.gebied,
  'gebieden/stadsdeel': categoryLabels.gebied,
  'gebieden/gebiedsgerichtwerken': categoryLabels.gebied,
  'gebieden/buurtcombinatie': categoryLabels.gebied,
  'gebieden/buurt': categoryLabels.gebied,
  'gebieden/bouwblok': categoryLabels.gebied,
  'meetbouten/meetbout': categoryLabels.meetbout,
  'nap/peilmerk': categoryLabels.napPijlmerk,
  'bommenkaart/verdachtgebied': categoryLabels.explosief,
  'bommenkaart/bominslag': categoryLabels.explosief,
  'bommenkaart/uitgevoerdonderzoek': categoryLabels.explosief,
  'bommenkaart/gevrijwaardgebied': categoryLabels.explosief,
  'monumenten/monument': categoryLabels.monument
};

export default function geoSearch(location) {
  const allRequests = endpoints.map((endpoint) => {
    const searchParams = {
      lat: location[0],
      lon: location[1]
    };

    if (endpoint.radius) {
      searchParams.radius = endpoint.radius;
    }

    const queryString = Object.keys(searchParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
      .join('&');

    return fetch(`${apiUrl}${endpoint.uri}?${queryString}`)
      .then((response) => response.json())
      .then((response) => response.features
        .map((feature) => ({
          uri: feature.properties.uri,
          label: feature.properties.display,
          categoryLabel: categoryLabelsByType[feature.properties.type]
        })))
      .catch((error) => { throw error; });
  });

  return Promise.all(allRequests)
    .then((results) => results.reduce((acc, subResults) => acc.concat(subResults)));
}
