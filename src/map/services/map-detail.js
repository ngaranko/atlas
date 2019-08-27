import vestiging from './vestiging/vestiging'
import SHARED_CONFIG from '../../shared/services/shared-config/shared-config'

import adressenNummeraanduiding from './adressen-nummeraanduiding/adressen-nummeraanduiding'
import gebiedenStadsdeel from './gebieden-stadsdeel/gebieden-stadsdeel'
import vastgoed from './vastgoed/vastgoed'
import {
  oplaadpunten,
  bekendmakingen,
  napPeilmerk,
  adressenPand,
  adressenVerblijfsobject,
  kadastraalObject,
  explosieven,
  evenementen,
  grondexploitatie,
} from './normalize/normalize'
import mapFetch from './map-fetch/map-fetch'

export const maxDisplayValuesPerProperty = 5

export const pageEndpointTypeMapping = {
  'explosieven/gevrijwaardgebied/': 'milieuthemas/explosieven/gevrijwaardgebied/',
  'explosieven/inslagen/': 'milieuthemas/explosieven/inslagen/',
  'explosieven/uitgevoerdonderzoek/': 'milieuthemas/explosieven/uitgevoerdonderzoek/',
  'explosieven/verdachtgebied/': 'milieuthemas/explosieven/verdachtgebied/',
}

export const pageTypeToEndpoint = (type, subtype, id) => {
  const endpoinType = pageEndpointTypeMapping[`${type}/${subtype}/`] || `${type}/${subtype}/`
  return `${SHARED_CONFIG.API_ROOT}${endpoinType}${id}/`
}

export const endpointTypes = {
  adressenLigplaats: 'bag/ligplaats/',
  adressenNummeraanduiding: 'bag/nummeraanduiding/',
  adressenOpenbareRuimte: 'bag/openbareruimte/',
  adressenPand: 'bag/pand/',
  adressenStandplaats: 'bag/standplaats/',
  adressenVerblijfsobject: 'bag/verblijfsobject/',
  bedrijfsinvesteringszone: 'vsd/biz/',
  bekendmakingen: 'vsd/bekendmakingen/',
  explosievenGevrijwaardGebied: 'milieuthemas/explosieven/gevrijwaardgebied/',
  explosievenInslag: 'milieuthemas/explosieven/inslagen/',
  explosievenUitgevoerdOnderzoek: 'milieuthemas/explosieven/uitgevoerdonderzoek/',
  explosievenVerdachtGebied: 'milieuthemas/explosieven/verdachtgebied/',
  evenementen: 'vsd/evenementen/',
  gebiedenBouwblok: 'gebieden/bouwblok/',
  gebiedenBuurt: 'gebieden/buurt/',
  gebiedenGebiedsgerichtWerken: 'gebieden/gebiedsgerichtwerken/',
  gebiedenGrootstedelijk: 'gebieden/grootstedelijkgebied/',
  gebiedenStadsdeel: 'gebieden/stadsdeel/',
  gebiedenUnesco: 'gebieden/unesco/',
  gebiedenWijk: 'gebieden/buurtcombinatie/',
  grondexploitatie: 'grondexploitatie/project/',
  kadastraalObject: 'brk/object/',
  meetbout: 'meetbouten/meetbout/',
  monument: 'monumenten/monumenten/',
  napPeilmerk: 'nap/peilmerk/',
  oplaadpunten: 'vsd/oplaadpunten/',
  parkeervak: 'parkeervakken/parkeervakken/',
  parkeerzones: 'vsd/parkeerzones/',
  parkeerzonesUitz: 'vsd/parkeerzones_uitz/',
  vastgoed: 'vsd/vastgoed',
  vestiging: 'handelsregister/vestiging/',
  winkelgebied: 'vsd/winkgeb',
}

const servicesByEndpointType = {
  [endpointTypes.adressenLigplaats]: { fetch: mapFetch },
  [endpointTypes.adressenNummeraanduiding]: {
    fetch: mapFetch,
    normalization: adressenNummeraanduiding,
  },
  [endpointTypes.adressenOpenbareRuimte]: { fetch: mapFetch },
  [endpointTypes.adressenPand]: { fetch: mapFetch, normalization: adressenPand },
  [endpointTypes.adressenStandplaats]: { fetch: mapFetch },
  [endpointTypes.adressenVerblijfsobject]: {
    fetch: mapFetch,
    normalization: adressenVerblijfsobject,
  },
  [endpointTypes.bedrijfsinvesteringszone]: { fetch: mapFetch },
  [endpointTypes.bekendmakingen]: { fetch: mapFetch, normalization: bekendmakingen },
  [endpointTypes.explosievenGevrijwaardGebied]: {
    fetch: mapFetch,
    normalization: explosieven,
  },
  [endpointTypes.explosievenInslag]: { fetch: mapFetch, normalization: explosieven },
  [endpointTypes.explosievenUitgevoerdOnderzoek]: {
    fetch: mapFetch,
    normalization: explosieven,
  },
  [endpointTypes.explosievenVerdachtGebied]: {
    fetch: mapFetch,
  },
  [endpointTypes.evenementen]: { fetch: mapFetch, normalization: evenementen },
  [endpointTypes.gebiedenBouwblok]: { fetch: mapFetch },
  [endpointTypes.gebiedenBuurt]: { fetch: mapFetch },
  [endpointTypes.gebiedenGebiedsgerichtWerken]: {
    fetch: mapFetch,
  },
  [endpointTypes.gebiedenGrootstedelijk]: { fetch: mapFetch },
  [endpointTypes.gebiedenStadsdeel]: { fetch: mapFetch, normalization: gebiedenStadsdeel },
  [endpointTypes.gebiedenUnesco]: { fetch: mapFetch },
  [endpointTypes.gebiedenWijk]: { fetch: mapFetch },
  [endpointTypes.grondexploitatie]: {
    fetch: mapFetch,
    normalization: grondexploitatie,
    authScope: 'GREX/R',
  },
  [endpointTypes.kadastraalObject]: { fetch: mapFetch, normalization: kadastraalObject },
  [endpointTypes.meetbout]: { fetch: mapFetch },
  [endpointTypes.monument]: { fetch: mapFetch },
  [endpointTypes.napPeilmerk]: { fetch: mapFetch, normalization: napPeilmerk },
  [endpointTypes.oplaadpunten]: { fetch: mapFetch, normalization: oplaadpunten },
  [endpointTypes.parkeervak]: { fetch: mapFetch },
  [endpointTypes.parkeerzones]: { fetch: mapFetch },
  [endpointTypes.parkeerzonesUitz]: { fetch: mapFetch },
  [endpointTypes.vastgoed]: { fetch: mapFetch, normalization: vastgoed },
  [endpointTypes.vestiging]: { fetch: vestiging, authScope: 'HR/R' },
  [endpointTypes.winkelgebied]: { fetch: mapFetch },
}

const getEndpointTypeForResult = (endpointType, detail) => {
  if (endpointType === endpointTypes.adressenNummeraanduiding) {
    if (detail.ligplaats) {
      return endpointTypes.adressenLigplaats
    }
    if (detail.standplaats) {
      return endpointTypes.adressenStandplaats
    }
    return endpointTypes.adressenNummeraanduiding
  }
  return endpointType
}

export default async function fetchDetail(endpoint, user) {
  const endpointType = Object.keys(servicesByEndpointType).find(type => endpoint.includes(type))
  const endpointConfig = endpointType && servicesByEndpointType[endpointType]
  const fetchEndpoint = endpointConfig && endpointConfig.fetch
  const normalization = endpointConfig && endpointConfig.normalization
  const authScope = endpointConfig && endpointConfig.authScope
  const isAuthorized = !authScope || user.scopes.includes(authScope)
  const detail = fetchEndpoint && isAuthorized && (await fetchEndpoint(endpoint, normalization))
  const endpointTypeForResult = getEndpointTypeForResult(endpointType, detail)

  return {
    ...(detail || {}),
    isAuthorized,
    endpointType: endpointTypeForResult,
  }
}

window.mapPreviewPanelDetailEndpointTypes = endpointTypes
