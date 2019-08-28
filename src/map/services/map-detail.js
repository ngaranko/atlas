import vestiging from './vestiging/vestiging'
import SHARED_CONFIG from '../../shared/services/shared-config/shared-config'

import adressenNummeraanduiding from './adressen-nummeraanduiding/adressen-nummeraanduiding'
import gebiedenStadsdeel from './gebieden-stadsdeel/gebieden-stadsdeel'
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
  vastgoed,
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

export const servicesByEndpointType = {
  [endpointTypes.adressenLigplaats]: {},
  [endpointTypes.adressenNummeraanduiding]: {
    normalization: adressenNummeraanduiding,
  },
  [endpointTypes.adressenOpenbareRuimte]: {},
  [endpointTypes.adressenPand]: { normalization: adressenPand },
  [endpointTypes.adressenStandplaats]: {},
  [endpointTypes.adressenVerblijfsobject]: {
    normalization: adressenVerblijfsobject,
  },
  [endpointTypes.bedrijfsinvesteringszone]: {},
  [endpointTypes.bekendmakingen]: { normalization: bekendmakingen },
  [endpointTypes.explosievenGevrijwaardGebied]: {
    normalization: explosieven,
  },
  [endpointTypes.explosievenInslag]: { normalization: explosieven },
  [endpointTypes.explosievenUitgevoerdOnderzoek]: {
    normalization: explosieven,
  },
  [endpointTypes.explosievenVerdachtGebied]: {},
  [endpointTypes.evenementen]: { normalization: evenementen },
  [endpointTypes.gebiedenBouwblok]: {},
  [endpointTypes.gebiedenBuurt]: {},
  [endpointTypes.gebiedenGebiedsgerichtWerken]: {},
  [endpointTypes.gebiedenGrootstedelijk]: {},
  [endpointTypes.gebiedenStadsdeel]: { normalization: gebiedenStadsdeel },
  [endpointTypes.gebiedenUnesco]: {},
  [endpointTypes.gebiedenWijk]: {},
  [endpointTypes.grondexploitatie]: {
    normalization: grondexploitatie,
    authScope: 'GREX/R',
  },
  [endpointTypes.kadastraalObject]: { normalization: kadastraalObject },
  [endpointTypes.meetbout]: {},
  [endpointTypes.monument]: {},
  [endpointTypes.napPeilmerk]: { normalization: napPeilmerk },
  [endpointTypes.oplaadpunten]: { normalization: oplaadpunten },
  [endpointTypes.parkeervak]: {},
  [endpointTypes.parkeerzones]: {},
  [endpointTypes.parkeerzonesUitz]: {},
  [endpointTypes.vastgoed]: { normalization: vastgoed },
  [endpointTypes.vestiging]: { authScope: 'HR/R', normalization: vestiging },
  [endpointTypes.winkelgebied]: {},
}

export const getEndpointTypeForResult = (endpointType, detail) => {
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
  const normalization = endpointConfig && endpointConfig.normalization
  const authScope = endpointConfig && endpointConfig.authScope
  const isAuthorized = !authScope || user.scopes.includes(authScope)
  const detail = isAuthorized && (await mapFetch(endpoint, normalization))
  const endpointTypeForResult = getEndpointTypeForResult(endpointType, detail)

  return {
    ...(detail || {}),
    isAuthorized,
    endpointType: endpointTypeForResult,
  }
}

window.mapPreviewPanelDetailEndpointTypes = endpointTypes
