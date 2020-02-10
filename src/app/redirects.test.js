/**
 * @jest-environment jsdom-global
 */

import resolveRedirects, { REDIRECTS } from './redirects'

jest.useFakeTimers()

describe('redirects', () => {
  const { replace } = window.location

  beforeEach(() => {
    Object.defineProperty(window.location, 'replace', {
      configurable: true,
    })
    window.location.replace = jest.fn()
  })

  afterEach(() => {
    window.location.replace = replace
  })

  it('should redirect matched routes', () => {
    REDIRECTS.forEach(route => {
      jsdom.reconfigure({ url: `https://www.someurl.com${route.from}` })
      resolveRedirects()
      jest.runAllTimers()

      expect(window.location.replace).toHaveBeenCalledWith(route.to)
    })
  })

  it('should redirect matched routes (without a trailing slash)', () => {
    REDIRECTS.forEach(route => {
      const from = route.from.endsWith('/') ? route.from.slice(0, -1) : route.from
      jsdom.reconfigure({ url: `https://www.someurl.com${from}` })
      resolveRedirects()
      jest.runAllTimers()

      expect(window.location.replace).toHaveBeenCalledWith(route.to)
    })
  })

  it('should not redirect unmatched routes', () => {
    jsdom.reconfigure({ url: 'https://www.someurl.com#a-hash-url' })
    resolveRedirects()
    jest.runAllTimers()

    expect(window.location.replace).not.toHaveBeenCalled()

    jsdom.reconfigure({ url: 'https://www.someurl.com/foo/bar' })
    resolveRedirects()
    jest.runAllTimers()

    expect(window.location.replace).not.toHaveBeenCalled()
  })
})
