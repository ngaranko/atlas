import { getAuthHeaders } from '../auth/auth';
import { getCenter } from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

const apiUrl = `https://${process.env.NODE_ENV !== 'production' ? 'acc.' : ''}api.data.amsterdam.nl/`;

export function fetchByUri(uri) {
  return fetch(uri, { headers: getAuthHeaders() })
    .then((response) => response.json());
}
