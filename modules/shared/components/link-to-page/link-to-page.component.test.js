describe('The link-to-page component', function() {
  let $compile
  let $rootScope

  beforeEach(function() {
    angular.mock.module('dpShared')

    angular.mock.inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_
      $rootScope = _$rootScope_
    })
  })

  function getComponent() {
    const element = document.createElement('dp-link-to-page')
    const scope = $rootScope.$new()
    const component = $compile(element)(scope)
    scope.$apply()
    return component
  }

  it('has default label', function() {
    const component = getComponent()
    expect(component.text().trim()).toBe('Help > Bediening > Inloggen')
  })
})
