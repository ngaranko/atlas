import get from 'lodash.get'

import getCenter from '../geo-json/geo-json'
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter'
import maatschappelijkeActiviteit from '../maatschappelijke-activiteit/maatschappelijke-activiteit'
import SHARED_CONFIG from '../shared-config/shared-config'

import { getByUrl } from '../api/api'

const maxDisplayValuesPerProperty = 5

export default function fetchByUri(uri) {
  return getByUrl(uri).then(result => {
    const visitingCoordinates = get(result.bezoekadres, 'geometrie')
    const geometryCenter =
      (result.geometrie && getCenter(result.geometrie)) ||
      (visitingCoordinates && getCenter(visitingCoordinates))
    const wgs84Center = geometryCenter ? rdToWgs84(geometryCenter) : null
    const vestigingResult = {
      ...result,
      location: result.location || wgs84Center,
      type: result.hoofdvestiging ? 'Hoofdvestiging' : 'Nevenvestiging',
    }

    return result.maatschappelijke_activiteit
      ? maatschappelijkeActiviteit(result.maatschappelijke_activiteit).then(mac => {
          const special = vestigingResult._bijzondere_rechts_toestand || {}

          const activities = (vestigingResult.activiteiten || []).map(activity => ({
            ...activity,
            sbiCode: activity.sbi_code,
            sbiDescription: activity.sbi_omschrijving,
          }))

          return {
            ...vestigingResult,
            activities,
            activitiesLabel: (activities.slice(0, maxDisplayValuesPerProperty) || [])
              .map(item => `${item.sbiCode}: ${item.sbiDescription}`)
              .join('\n'),
            bijzondereRechtstoestand: special.faillissement
              ? {
                  ...special,
                  surseanceVanBetaling:
                    special.status === 'Voorlopig' || special.status === 'Definitief',
                  label:
                    special && special.faillissement ? 'Faillissement' : 'Surseance van betaling',
                }
              : {},
            kvkNumber: mac.kvk_nummer,
            label: vestigingResult._display,
            visitingAddress: vestigingResult.bezoekadres
              ? `${vestigingResult.bezoekadres.straatnaam} ${vestigingResult.bezoekadres.huisnummer} ${vestigingResult.bezoekadres.huisnummertoevoeging}
${vestigingResult.bezoekadres.postcode} ${vestigingResult.bezoekadres.plaats}`
              : 'Onbekend',
          }
        })
      : vestigingResult
  })
}

export function fetchByPandId(pandId) {
  const searchParams = {
    pand: pandId,
  }

  const queryString = Object.keys(searchParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&')

  return getByUrl(`${SHARED_CONFIG.API_ROOT}handelsregister/vestiging/?${queryString}`).then(
    data => data.results,
  )
}

export function fetchByAddressId(addressId) {
  const searchParams = {
    nummeraanduiding: addressId,
  }

  const queryString = Object.keys(searchParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`)
    .join('&')

  return getByUrl(`${SHARED_CONFIG.API_ROOT}handelsregister/vestiging/?${queryString}`).then(
    data => data.results,
  )
}
