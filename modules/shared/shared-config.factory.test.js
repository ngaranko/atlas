describe('The sharedConfig factory', function() {
  function prepareMocks(environmentName) {
    let sharedConfig

    angular.mock.module('dpShared', function($provide) {
      $provide.value('environment', {
        NAME: environmentName,
      })
    })

    angular.mock.inject(function(_sharedConfig_) {
      sharedConfig = _sharedConfig_
    })

    return sharedConfig
  }

  describe('returns a combination of global and environment specific configuration', function() {
    it('ACCEPTANCE', function() {
      const sharedConfig = prepareMocks('ACCEPTANCE')

      // Global config
      expect(sharedConfig.RADIUS).toBe(50)
      expect(sharedConfig.THUMBNAIL_WIDTH).toBe(240)
      expect(sharedConfig.PANORAMA_THUMBNAIL_URL).toBe('panorama/thumbnail/')

      // Environment config
      expect(sharedConfig.API_ROOT).toBe('https://acc.api.data.amsterdam.nl/')
    })

    it('DEVELOPMENT', function() {
      const sharedConfig = prepareMocks('DEVELOPMENT')

      // Global config
      expect(sharedConfig.RADIUS).toBe(50)
      expect(sharedConfig.THUMBNAIL_WIDTH).toBe(240)
      expect(sharedConfig.PANORAMA_THUMBNAIL_URL).toBe('panorama/thumbnail/')

      // Environment config
      expect(sharedConfig.API_ROOT).toBe('https://acc.api.data.amsterdam.nl/')
    })
  })
})
