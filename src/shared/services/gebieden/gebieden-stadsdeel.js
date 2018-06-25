import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';
import { getByUrl } from '../api/api';
import SHARED_CONFIG from '../shared-config/shared-config';

function fetchStadsdeel(uri) {
  return fetch(uri)
    .then((response) => response.json())
    .then((result) => {
      const geometryCenter = result.geometrie && getCenter(result.geometrie);
      const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null;

      return {
        ...result,
        label: result.naam,
        location: result.location || wgs84Center
      };
    });
}

const fetchGrexStadsdeel = async (stadsdeelCode) => {
  const url = `${SHARED_CONFIG.API_ROOT}grondexploitatie/stadsdeel/${stadsdeelCode}/`;
  const grexStadsdeel = await getByUrl(url);
  return grexStadsdeel;
};

const fetchByUri = async (uri, user) => {
  const stadsdeel = await fetchStadsdeel(uri);
  if (user && user.scopes.includes('GREX/R')) {
    const grexStadsdeel = await fetchGrexStadsdeel(stadsdeel.code);
    return {
      ...stadsdeel,
      grexStadsdeel
    };
  }
  return stadsdeel;
};

export default fetchByUri;
