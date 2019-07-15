import { ERROR_TYPES } from '../../../../src/shared/ducks/error/error-message'

describe('The window error handler', function() {
  const httpStatus = {
    logResponse: angular.noop,
    registerError: angular.noop,
  }

  let $rootScope
  let onError
  let windowErrorHandler

  beforeEach(function() {
    onError = null
    const window = {
      addEventListener(type, func) {
        if (type === 'error') {
          onError = func
        }
      },
    }

    angular.mock.module('dpShared', {
      httpStatus,
    })

    angular.mock.module(function($provide) {
      $provide.value('$window', window)
    })

    angular.mock.inject(function(_$rootScope_, _windowErrorHandler_) {
      windowErrorHandler = _windowErrorHandler_
      $rootScope = _$rootScope_
    })

    // add error event handler to window
    windowErrorHandler()
    $rootScope.$digest()

    spyOn(httpStatus, 'registerError')
    spyOn(httpStatus, 'logResponse')
  })

  it('registers target-less window errors', () => {
    onError({}) // without target src url
    $rootScope.$digest()

    expect(httpStatus.registerError).not.toHaveBeenCalledWith(
      ERROR_TYPES.GENERAL_ERROR,
    )
    expect(httpStatus.logResponse).toHaveBeenCalledWith('window error event')
  })

  it('captures message exception if provided', () => {
    const message = 'my message'
    const error = new Error('my error')
    onError({
      message,
      error,
    })
    $rootScope.$digest()

    expect(httpStatus.registerError).not.toHaveBeenCalledWith(
      ERROR_TYPES.GENERAL_ERROR,
    )
    expect(httpStatus.logResponse).not.toHaveBeenCalled()
  })

  it('registers url load errors by listening to window error events', function() {
    onError({
      target: {
        src: 'aap',
      },
    })
    $rootScope.$digest()

    expect(httpStatus.registerError).toHaveBeenCalledWith(
      ERROR_TYPES.GENERAL_ERROR,
    )
    expect(httpStatus.logResponse).toHaveBeenCalledWith(
      'window error event, HTTP external request error, src: aap',
    )
  })

  it('does not register error if piwik is not loaded', function() {
    onError({
      target: {
        src: 'https://piwik.data.amsterdam.nl/piwik.js',
      },
    })
    $rootScope.$digest()

    expect(httpStatus.registerError).not.toHaveBeenCalledWith(
      ERROR_TYPES.GENERAL_ERROR,
    )
    expect(httpStatus.logResponse).not.toHaveBeenCalled()
  })
})
