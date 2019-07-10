import { testSaga, expectSaga } from 'redux-saga-test-plan'
import watchContentSaga, { navigate } from './content'
import { NAVIGATE, CMS_PAGE_MAPPING } from '../../ducks/content/constants'
import PAGES from '../../../app/pages'
import { routing } from '../../../app/routes'

describe('watchContentSaga', () => {
  it('should watch the error actions and call authenticateUser', () => {
    testSaga(watchContentSaga)
      .next()
      .takeLatestEffect(NAVIGATE, navigate)
      .next()
      .isDone()
  })
})

describe('navigate', () => {
  it('should navigate to the right content', () => {
    const mockPayload = { ...CMS_PAGE_MAPPING[PAGES.NEWS] }
    const mockAction = type => ({ type })
    expectSaga(navigate, { payload: mockPayload })
      .put(mockAction(routing.nieuws.type))
      .run()
  })
})
