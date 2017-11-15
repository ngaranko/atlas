const apiUrl = 'https://acc.api.data.amsterdam.nl/';

export default function fetchByPandId(pandId) {
  const searchParams = {
    pand: pandId
  };

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&');

  return fetch(`${apiUrl}bag/nummeraanduiding/?${queryString}`)
    .then((response) => response.json())
    .then((data) => data.results);
}

export function fetchByLigplaatsId(ligplaatsId) {
  const searchParams = {
    ligplaats: ligplaatsId
  };

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&');

  return fetch(`${apiUrl}bag/nummeraanduiding/?${queryString}`)
    .then((response) => response.json())
    .then((data) => data.results
      .map((result) => ({
        ...result,
        id: result.landelijk_id
      }))
    );
}

export function fetchHoofdadresByLigplaatsId(ligplaatsId) {
  return fetchByLigplaatsId(ligplaatsId)
    .then((results) => results.find((result) => result.hoofdadres));
}

export function fetchByStandplaatsId(standplaatsId) {
  const searchParams = {
    standplaats: standplaatsId
  };

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&');

  return fetch(`${apiUrl}bag/nummeraanduiding/?${queryString}`)
    .then((response) => response.json())
    .then((data) => data.results
      .map((result) => ({
        ...result,
        id: result.landelijk_id
      }))
    );
}

export function fetchHoofdadresByStandplaatsId(standplaatsId) {
  return fetchByStandplaatsId(standplaatsId)
    .then((results) => results.find((result) => result.hoofdadres));
}
