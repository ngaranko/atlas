import getCenter from '../geo-json/geo-json'
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter'
import formatDate from '../date-formatter/date-formatter'

import { getByUrl } from '../api/api'

export default function fetchByUri(uri) {
  return getByUrl(uri).then(result => {
    const geometryCenter = result.geometrie && getCenter(result.geometrie)
    const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null

    const date = result.datum ? new Date(result.datum) : null

    return {
      ...result,
      date,
      dateLabel: formatDate(date),
      label: result._display,
      location: result.location || wgs84Center,
      verdachtGebied: result.verdacht_gebied,
    }
  })
}
