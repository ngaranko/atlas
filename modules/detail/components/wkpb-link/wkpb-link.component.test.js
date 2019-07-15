describe('The dp-wkpb-link directive', function() {
  let $compile
  let $rootScope

  beforeEach(function() {
    angular.mock.module(
      'dpDetail',
      {
        sharedConfig: {
          ROOT: 'http://www.amsterdam.com/',
        },
      },
      function($provide) {
        $provide.factory('dpLinkDirective', function() {
          return {}
        })
      },
    )

    angular.mock.inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_
      $rootScope = _$rootScope_
    })
  })

  function getComponent(brkId) {
    const element = document.createElement('dp-wkpb-link')
    element.setAttribute('brk-id', brkId)

    const scope = $rootScope.$new()

    const component = $compile(element)(scope)
    scope.$apply()

    return component
  }

  it('creates a dp-redux-link that directs to a object-wkpb endpoint', function() {
    const component = getComponent('abc789')
    const scope = component.isolateScope()

    expect(component.find('dp-redux-link').attr('to')).toBe(
      'vm.wkpbEndpoint | detailEndpointAction',
    )
    expect(scope.vm.wkpbEndpoint).toBe(
      'http://www.amsterdam.com/brk/object-wkpb/abc789/',
    )
  })

  it('is spelled WKPB-uittreksel', function() {
    const component = getComponent('abc789')

    expect(component.text()).toContain('WKPB-uittreksel')
    expect(component.text()).not.toContain('WKPB uittreksel')
  })
})
