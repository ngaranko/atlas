/**
 * @jest-environment jsdom-global
 */

import resolveRedirects, { REDIRECTS } from './redirects'

jest.useFakeTimers()

const expectWithNewRoute = (route, expectation, cb) => {
  jsdom.reconfigure({ url: route })
  const { location } = window
  delete window.location
  window.location = { ...location, replace: jest.fn() }

  resolveRedirects()
  jest.runAllTimers()

  cb(expect(window.location.replace))
  window.location = location
}

describe('redirects', () => {
  it('should redirect matched routes', () => {
    REDIRECTS.forEach(route => {
      expectWithNewRoute(`https://www.someurl.com${route.from}`, window.location.replace, expect =>
        expect.toHaveBeenCalledWith(route.to),
      )
    })
  })

  it('should redirect matched routes (without a trailing slash)', () => {
    REDIRECTS.forEach(route => {
      const from = route.from.endsWith('/') ? route.from.slice(0, -1) : route.from
      expectWithNewRoute(`https://www.someurl.com${from}`, window.location.replace, expect =>
        expect.toHaveBeenCalledWith(route.to),
      )
    })
  })

  it('should not redirect unmatched routes', () => {
    jsdom.reconfigure({ url: 'https://www.someurl.com#a-hash-url' })
    const { location } = window
    delete window.location
    window.location = {
      ...location,
      replace: jest.fn(),
    }
    resolveRedirects()
    jest.runAllTimers()

    expect(window.location.replace).not.toHaveBeenCalled()

    jsdom.reconfigure({ url: 'https://www.someurl.com/foo/bar' })
    resolveRedirects()
    jest.runAllTimers()

    expect(window.location.replace).not.toHaveBeenCalled()
    window.location = location
  })
})
