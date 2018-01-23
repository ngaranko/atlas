import apiUrl from '../api';
import verblijfsobject from './adressen-verblijfsobject';

export default function fetchByUri(uri) {
  return fetch(uri)
    .then((response) => response.json())
    .then((result) => ({
      ...result,
      label: result._display,
      isNevenadres: !result.hoofdadres
    }))
    .then((result) => (
      result.verblijfsobject ?
        verblijfsobject(result.verblijfsobject)
          .then((vboResult) => ({
            ...vboResult,
            label: result.label,
            isNevenadres: result.isNevenadres
          })) :
        result
    ));
}

export function fetchByPandId(pandId) {
  const searchParams = {
    pand: pandId
  };

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&');

  return fetch(`${apiUrl}bag/nummeraanduiding/?${queryString}`)
    .then((response) => response.json())
    .then((data) => data.results.map((result) => ({ ...result, count: data.count })));
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
