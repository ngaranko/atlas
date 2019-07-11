import { select } from 'redux-saga/effects'
import { getUserScopes } from '../../shared/ducks/user/user'
import {
  getParts,
  getTemplateUrl,
} from '../services/endpoint-parser/endpoint-parser'
import { getApiSpecificationData } from '../../shared/ducks/datasets/datasets'
import formatDetailData from '../services/data-formatter/data-formatter'
import { getByUrl } from '../../shared/services/api/api'

import * as vastgoed from '../../shared/services/vastgoed/vastgoed'

export default function* getDetailData(endpoint, mapDetail = {}) {
  const includeSrc = getTemplateUrl(endpoint)
  const [category, subject] = getParts(endpoint)

  // TODO ensure api specification
  const scopes = yield select(getUserScopes)

  if (
    (category === 'brk' &&
      subject === 'subject' &&
      !scopes.includes('BRK/RS')) ||
    (category === 'handelsregister' && !scopes.includes('HR/R')) ||
    (category === 'grondexploitatie' && !scopes.includes('GREX/R'))
  ) {
    // User is not authorized to view
    //   BRK Kadastrale Subjecten, nor
    //   handelsregister, nor
    //   grondexploitatie
    // so do not fetch data
    return {
      includeSrc,
      data: null,
    }
  }

  // Get data from individual endpoints to construct the detail view for vastgoed
  if (category === 'vsd' && subject === 'vastgoed') {
    const features = yield vastgoed.fetchByGeoLocation(mapDetail.location)

    const data = {
      ...mapDetail,
      features: [...(features.length > 1 ? features : [{ ...mapDetail }])],
    }

    return {
      includeSrc,
      data,
    }
  }

  // TODO console.log('append version=3 to grondexploitaties');
  const endpointVersion = category === 'grondexploitatie' ? '?version=3' : ''
  const catalogFilters = yield select(getApiSpecificationData)

  // TODO replace this call with mapDetail value
  const data = yield getByUrl(`${endpoint}${endpointVersion}`)
  const formatedData = {
    ...mapDetail,
    ...formatDetailData(data, category, subject, catalogFilters, scopes),
  }

  return {
    includeSrc,
    data: formatedData,
    filterSelection: {
      [subject]: formatedData.naam,
    },
  }
}
