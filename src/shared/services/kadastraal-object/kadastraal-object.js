import { getCenter } from '../geo-json/geo-json';

export function fetchByUri(uri) {
  return fetch(uri)
    .then((response) => response.json())
    .then((result) => ({
      ...result,
      location: result.location || (result.geometrie && getCenter(result.geometrie))
    }));
}
