describe('The dp-print-button component', function() {
  let $compile
  let $rootScope
  let $window

  beforeEach(function() {
    angular.mock.module('dpHeader')

    angular.mock.inject(function(_$compile_, _$rootScope_, _$window_) {
      $compile = _$compile_
      $rootScope = _$rootScope_
      $window = _$window_
    })
  })

  function getComponent(html) {
    const element = document.createElement('dp-print-button')

    if (angular.isString(html)) {
      element.innerHTML = html
    }

    const scope = $rootScope.$new()
    const component = $compile(element)(scope)
    scope.$digest()

    return component
  }

  it('prints the page when clicking a button', function() {
    spyOn($window, 'print')

    const component = getComponent()
    component.find('button').click()

    expect($window.print).toHaveBeenCalled()
  })

  it('transcludes stuff', function() {
    const html = '<span class="some-class">Afdrukken</span>'
    const component = getComponent(html)

    expect(component.find('button span').text()).toBe('Afdrukken')
    expect(component.find('button span').attr('class')).toContain('some-class')
  })
})
