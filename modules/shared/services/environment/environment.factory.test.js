describe('The environment factory', function() {
  let mockedHostname

  beforeEach(function() {
    angular.mock.module('dpShared', {
      $location: {
        host() {
          return mockedHostname
        },
      },
    })
  })

  it('is set to development by default', function() {
    mockedHostname = 'data.amsterdam.nl'

    angular.mock.inject(function(environment) {
      expect(environment.NAME).toEqual('DEVELOPMENT')
      expect(environment.isDevelopment()).toBe(true)
    })
  })

  it('is set to pre production based on hostname', function() {
    mockedHostname = 'pre.data.amsterdam.nl'

    angular.mock.inject(function(environment) {
      expect(environment.NAME).toEqual('PRE_PRODUCTION')
      expect(environment.isDevelopment()).toBe(false)
    })
  })
})
