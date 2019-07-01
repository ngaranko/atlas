describe('The message component', function() {
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
    const scope = $rootScope.$new()
    const component = $compile('<dp-message>melding</dp-message>')(scope)
    scope.$apply()
    return component
  }

  it('displays a styled message', function() {
    const component = getComponent()

    expect(component.find('span').length).toBe(1)
    expect(component.text().trim()).toBe('melding')
  })
})
