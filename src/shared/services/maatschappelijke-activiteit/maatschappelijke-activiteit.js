import { getAuthHeaders } from '../auth/auth';

export default function fetchByUri(uri) {
  return fetch(uri, { headers: getAuthHeaders() })
    .then((response) => response.json());
}
