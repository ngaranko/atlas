describe('The dp-logout-button component', function() {
  let $compile
  let $rootScope
  let store
  let $window
  let origAuth

  beforeEach(function() {
    angular.mock.module('dpHeader', {
      store: {
        dispatch: angular.noop,
      },
    })

    angular.mock.inject(function(_$compile_, _$rootScope_, _store_, _$window_) {
      $compile = _$compile_
      $rootScope = _$rootScope_
      store = _store_
      $window = _$window_
    })

    origAuth = $window.auth
    $window.auth = {
      logout: angular.noop,
    }

    spyOn(store, 'dispatch')
  })

  afterEach(() => {
    $window.auth = origAuth
  })

  function getComponent() {
    const element = document.createElement('dp-logout-button')

    const scope = $rootScope.$new()
    const component = $compile(element)(scope)
    scope.$digest()

    return component
  }

  it('logs the user out when clicking the button', function() {
    spyOn($window.auth, 'logout')

    const component = getComponent()
    component.find('button').click()

    expect($window.auth.logout).toHaveBeenCalled()
  })
})
