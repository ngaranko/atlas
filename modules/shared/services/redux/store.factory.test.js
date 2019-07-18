describe('The store factory', function() {
  let $window

  beforeEach(function() {
    angular.mock.module('dpShared')

    angular.mock.inject(function(_$window_) {
      $window = _$window_
    })

    $window.reduxStore = 'I_AM_THE_STORE'
  })

  it('returns the store', function() {
    angular.mock.inject(function(store) {
      expect(store).toBe('I_AM_THE_STORE')
    })
  })
})
