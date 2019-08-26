import get from 'lodash.get'

import getCenter from '../geo-json/geo-json'
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter'

import { getByUrl } from '../api/api'

const statusLevel = {
  18: 'alert',
  19: 'alert',
  20: '',
  21: '',
  22: 'alert',
  23: 'alert',
}

const maxDisplayValuesPerProperty = 5

export default function fetchByUri(uri) {
  return getByUrl(uri).then(result => {
    const geometryCenter = result.geometrie && getCenter(result.geometrie)
    const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null

    const gebruiksdoelen = (result.gebruiksdoelen || []).map(item => ({
      ...item,
      description: item.omschrijving,
      descriptionPlus: item.omschrijving_plus,
    }))

    return {
      ...result,
      aanduidingInOnderzoek: result.aanduiding_in_onderzoek,
      indicatieGeconstateerd: result.indicatie_geconstateerd,
      status: {
        code: result.status ? result.status.code : '',
        description: result.status ? result.status.omschrijving : '',
        level: result.status && result.status.code ? statusLevel[result.status.code] : '',
      },
      eigendomsverhouding: get(result.eigendomsverhouding, 'omschrijving'),
      gebruiksdoelen,
      gebruiksdoelenLabel: (
        (result.gebruiksdoelen && result.gebruiksdoelen.slice(0, maxDisplayValuesPerProperty)) ||
        []
      )
        .map(
          item =>
            `${item.omschrijving}${item.omschrijving_plus ? `: ${item.omschrijving_plus}` : ''}`,
        )
        .join('\n'),
      use: {
        code: result.gebruik ? result.gebruik.code : '',
        description: result.gebruik ? result.gebruik.omschrijving : '',
      },
      label: result._display,
      location: result.location || wgs84Center,
      // The API even returns a value of `1` when the size is unknown
      size: result.oppervlakte > 1 ? result.oppervlakte : 0,
      sizeLabel:
        result.oppervlakte > 1 ? `${result.oppervlakte.toLocaleString('nl-NL')} m²` : 'Onbekend',
      type: get(result.type_woonobject, 'omschrijving'),
    }
  })
}
