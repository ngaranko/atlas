describe('The dp-data-selection-toggle-view-button component', function() {
  let $compile
  let $rootScope

  beforeEach(function() {
    angular.mock.module('dpDataSelection', {
      store: {
        dispatch: angular.noop,
      },
    })

    angular.mock.inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_
      $rootScope = _$rootScope_
    })
  })

  function getComponent(view) {
    const element = document.createElement(
      'dp-data-selection-toggle-view-button',
    )
    element.setAttribute('view', 'view')

    const scope = $rootScope.$new()
    scope.view = view

    const component = $compile(element)(scope)
    scope.$apply()

    return component
  }

  it('when in table view: it shows a link to the list view', function() {
    const component = getComponent('TABLE')
    $rootScope.$apply()

    expect(
      component
        .find('ng-transclude')
        .text()
        .trim(),
    ).toBe('Kaart weergeven')
    expect(
      component
        .find('button')
        .attr('title')
        .trim(),
    ).toBe('Resultaten op de kaart weergeven')
  })

  it('when in list view: it shows a link to the table view', function() {
    const component = getComponent('LIST')
    $rootScope.$apply()

    expect(
      component
        .find('ng-transclude')
        .text()
        .trim(),
    ).toBe('Tabel weergeven')
    expect(
      component
        .find('button')
        .attr('title')
        .trim(),
    ).toBe('Resultaten in tabel weergeven')
  })
})
