import { testSaga } from 'redux-saga-test-plan'
import {
  fetchMapSearchResultsFailure,
  fetchMapSearchResultsSuccessList,
  fetchMapSearchResultsSuccessPanel,
} from '../../ducks/data-search/actions'
import { fetchMapSearchResults } from './data-search'
import geosearch from '../../services/search/geosearch'
import search from '../../../map/services/map-search/map-search'
import { VIEW_MODE } from '../../ducks/ui/ui'

import ActiveOverlaysClass from '../../services/active-overlays/active-overlays'

jest.mock('../../services/active-overlays/active-overlays')

describe('fetchMapSearchResults', () => {
  beforeEach(() => {
    ActiveOverlaysClass.getOverlaysWarning.mockReturnValueOnce('')
  })

  it('should do a geo search in a list view', () => {
    testSaga(fetchMapSearchResults, {})
      .next()
      .next(12) // zoom
      .next(VIEW_MODE.SPLIT) // view
      .next('location')
      .next()
      .next()
      .next('user')
      .call(geosearch, 'location', 'user')
      .next([])
      .put(fetchMapSearchResultsSuccessList([], 0))
      .next()
      .isDone()
  })

  it('should do a geo search in a map view', () => {
    testSaga(fetchMapSearchResults, {})
      .next()
      .next(12) // zoom
      .next(VIEW_MODE.MAP) // view
      .next('location')
      .next()
      .next()
      .next('user')
      .call(search, 'location', 'user')
      .next({ results: [], error: false })
      .put(fetchMapSearchResultsSuccessPanel([], 0))
      .next()
      .isDone()
  })

  it('should throw error and put error', () => {
    const error = new Error('My Error')
    testSaga(fetchMapSearchResults, {})
      .next()
      .next()
      .next()
      .next()
      .next()
      .next()
      .next()
      .throw(error)
      .put(fetchMapSearchResultsFailure(''))
      .next()
      .isDone()
  })
})
