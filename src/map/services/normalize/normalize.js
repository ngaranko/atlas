import formatNumber from '../../../shared/services/number-formatter/number-formatter'
import formatDate from '../../../shared/services/date-formatter/date-formatter'

const normalize = (result, additionalFields) => {
  return {
    ...result,
    ...additionalFields,
  }
}

export const oplaadpunten = result => {
  const CHARGER_TYPES = {
    REGULAR: 'Gewoon laadpunt',
    FAST: 'Snellaadpunt',
  }

  const additionalFields = {
    address: result.street
      ? `${result.street} ${
          result.housenumberext
            ? `${result.housenumber} ${result.housenumberext},`
            : `${result.housenumber},`
        } ${result.city}`
      : null,

    // eslint-disable-next-line no-nested-ternary
    type: result.charging_cap_max
      ? result.charging_cap_max >= 50
        ? CHARGER_TYPES.FAST
        : CHARGER_TYPES.REGULAR
      : null,

    currentStatus:
      // eslint-disable-next-line no-nested-ternary
      result.status === 'Available'
        ? result.charging_point >= 2
          ? 'Eén of meerdere beschikbaar'
          : 'Beschikbaar'
        : 'Niet beschikbaar',
    quantity: result.charging_point || false,
    geometry: result.wkb_geometry,
  }

  return normalize(result, additionalFields)
}

export const napPeilmerk = result => {
  const additionalFields = {
    wallCoordinates:
      (result.x_muurvlak || result.x_muurvlak === 0) &&
      (result.y_muurvlak || result.y_muurvlak === 0)
        ? `${result.x_muurvlak}, ${result.y_muurvlak}`
        : '',
    height:
      result.hoogte_nap || result.hoogte_nap === 0 ? `${formatNumber(result.hoogte_nap)} m` : '',
  }

  return normalize(result, additionalFields)
}

export const adressenPand = result => {
  const statusLevel = {
    24: 'info',
    25: 'info',
    26: 'info',
    27: 'info',
    28: 'info',
    29: 'info',
    30: '',
    31: '',
    32: 'info',
  }

  const additionalFields = {
    statusLevel: result.status && result.status.code ? statusLevel[result.status.code] : false,
    year: result.oorspronkelijk_bouwjaar !== 1005 ? result.oorspronkelijk_bouwjaar : 'Onbekend',
  }

  return normalize(result, additionalFields)
}

export const adressenVerblijfsobject = result => {
  const statusLevel = {
    18: 'alert',
    19: 'alert',
    20: '',
    21: '',
    22: 'alert',
    23: 'alert',
  }

  const additionalFields = {
    statusLevel: result.status && result.status.code ? statusLevel[result.status.code] : false,
    gebruiksdoelen: ((result.gebruiksdoelen && result.gebruiksdoelen.slice(0, 5)) || [])
      .map(
        item =>
          `${item.omschrijving}${item.omschrijving_plus ? `: ${item.omschrijving_plus}` : ''}`,
      )
      .join('\n'),
    size: result.oppervlakte > 1 ? `${result.oppervlakte.toLocaleString('nl-NL')} m²` : 'Onbekend',
  }

  return normalize(result, additionalFields)
}

export const kadastraalObject = result => {
  const additionalFields = {
    size:
      result.grootte || result.grootte === 0 ? `${result.grootte.toLocaleString('nl-NL')} m²` : '',
    cadastralName: result.kadastrale_gemeente ? result.kadastrale_gemeente.naam : false,
    name: result.kadastrale_gemeente ? result.kadastrale_gemeente.gemeente._display : false,
  }

  return normalize(result, additionalFields)
}

export const bekendmakingen = result => {
  const additionalFields = {
    date: formatDate(new Date(result.datum)),
    geometry: result.wkb_geometry,
  }

  return normalize(result, additionalFields)
}

export const explosieven = result => {
  const additionalFields = {
    date: formatDate(new Date(result.datum)),
  }

  return normalize(result, additionalFields)
}

export const evenementen = result => {
  const additionalFields = {
    startDate: formatDate(new Date(result.startdatum)),
    endDate: result.einddatum ? formatDate(new Date(result.einddatum)) : false,
  }

  return normalize(result, additionalFields)
}

export const grondexploitatie = result => {
  const additionalFields = {
    startDate: formatDate(new Date(result.startdatum)),
  }

  return normalize(result, additionalFields)
}

export const vastgoed = result => {
  const additionalFields = {
    geometry: result.bag_pand_geometrie,
    construction_year: result.bouwjaar && result.bouwjaar !== 1005 ? result.bouwjaar : 'Onbekend',
    monumental_status: result.monumentstatus || 'Geen monument',
  }

  return { ...result, ...additionalFields }
}

export const vestiging = result => {
  const additionalFields = {
    geometry: (result.bezoekadres && result.bezoekadres.geometrie) || result.geometrie,
  }

  return { ...result, ...additionalFields }
}

export const societalActivities = result => {
  const additionalFields = {
    activities: (result.activiteiten || []).map(activity => activity),
    bijzondereRechtstoestand: {
      ...(result._bijzondere_rechts_toestand || {}),
      surseanceVanBetaling:
        (result._bijzondere_rechts_toestand &&
          result._bijzondere_rechts_toestand.status === 'Voorlopig') ||
        (result._bijzondere_rechts_toestand &&
          result._bijzondere_rechts_toestand.status === 'Definitief'),
    },
  }

  return normalize(result, additionalFields)
}

export const winkelgebied = result => {
  const additionalFields = {
    geometry: result.wkb_geometry,
  }

  return { ...result, ...additionalFields }
}

export const parkeerzones = result => {
  const additionalFields = {
    geometry: result.wkb_geometry,
  }

  return { ...result, ...additionalFields }
}

export const monument = result => {
  const additionalFields = {
    geometry: result.monumentcoordinaten,
  }

  return { ...result, ...additionalFields }
}

export default normalize
