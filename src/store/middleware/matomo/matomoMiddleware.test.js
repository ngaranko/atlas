import matomoMiddleware from './matomoMiddleware'
import matomoTracker from '../../../shared/services/matomo-tracker/matomo-tracker'

jest.mock('../../../shared/services/matomo-tracker/matomo-tracker')
jest.mock('./trackEvents', () => ({
  YOUR_ACTION_TYPE: ({ tracking }) => ['foo', 'foo', tracking, null],
}))

describe('matomoMiddleware', () => {
  const next = jest.fn()
  const store = jest.fn()
  store.getState = jest.fn(() => ({
    user: { authenticated: false, scopes: [] },
    ui: {},
  }))

  beforeEach(() => {
    global.window._paq = {
      push: jest.fn(),
    }
  })

  afterEach(() => {
    matomoTracker.mockReset()
  })

  it('should send a request to matomo if action should be tracked', () => {
    const action = { type: 'YOUR_ACTION_TYPE', meta: { tracking: 'data' } }

    matomoMiddleware(store)(next)(action)

    expect(matomoTracker).toHaveBeenCalled()
  })

  it('should send a request to matomo if action should be tracked and has tracking metadata', () => {
    const action = { type: 'YOUR_ACTION_TYPE' }

    matomoMiddleware(store)(next)(action)

    expect(matomoTracker).not.toHaveBeenCalled()
  })

  it('should NOT send a request to matomo if action should NOT be tracked', () => {
    const action = { type: 'YOUR_ACTION_TYPE_2', meta: { tracking: 'data' } }

    matomoMiddleware(store)(next)(action)

    expect(matomoTracker).not.toHaveBeenCalled()
  })
})
