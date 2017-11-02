import geoSearchConfig from './map-geo-search-config';

const apiUrl = 'https://api.data.amsterdam.nl/';

export default function geoSearch(location) {
  const allRequests = geoSearchConfig.endpoints.map((endpoint) => {
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
      .then(response => response.json())
      .then(response => response.features.map((feature) => feature.properties))
      .catch((error) => { throw error; });
  });

  return Promise.all(allRequests)
    .then((results) => results.reduce((acc, subResults) => acc.concat(subResults)))
    .then((results) => {
      console.log('results', results);
      return results;
    })
    .catch((error) => {
      console.log('error', error);
      throw error;
    });
}
