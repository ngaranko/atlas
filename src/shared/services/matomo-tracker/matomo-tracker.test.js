import matomoTracker from './matomo-tracker'

describe('matomoTracker', () => {
  beforeEach(() => {
    global.window._paq = {
      push: jest.fn(),
    }
  })

  it('should call window._paq.push', () => {
    matomoTracker(['test'], 'foo', 'string')

    expect(global.window._paq.push).toHaveBeenCalledWith(['test'])
    expect(global.window._paq.push).toHaveBeenCalledWith([
      'setCustomUrl',
      'foo',
    ])
    expect(global.window._paq.push).toHaveBeenCalledWith([
      'setDocumentTitle',
      'string',
    ])
    expect(global.window._paq.push).toHaveBeenCalledWith([
      'enableHeartBeatTimer',
    ])
  })

  it('should set customDimensions', () => {
    matomoTracker(['test'], 'foo', 'string', [{ id: 1, value: 'test' }])

    expect(global.window._paq.push).toHaveBeenCalledWith([
      'setCustomDimension',
      1,
      'test',
    ])
  })

  it('should not call window._paq.push without data', () => {
    matomoTracker([], '', '')

    expect(global.window._paq.push).not.toHaveBeenCalled()
  })
})
