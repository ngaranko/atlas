import { getAuthHeaders } from '../auth/auth';

const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/`;

export function fetchByPandId(pandId) {
  const searchParams = {
    pand: pandId
  };

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&');

  return fetch(`${apiUrl}handelsregister/vestiging/?${queryString}`,
    { headers: getAuthHeaders() }
  )
    .then((response) => response.json())
    .then((data) => data.results);
}

export function fetchByAddressId(addressId) {
  const searchParams = {
    nummeraanduiding: addressId
  };

  const queryString = Object.keys(searchParams)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&');

  return fetch(`${apiUrl}handelsregister/vestiging/?${queryString}`,
    { headers: getAuthHeaders() }
  )
    .then((response) => response.json())
    .then((data) => data.results);
}
