describe('The dp-embed-header component', () => {
  let $compile
  let $rootScope
  let scope

  beforeEach(() => {
    angular.mock.module('dpHeader', {
      store: {
        subscribe: callbackFn => {
          callbackFn()
        },
        getState: angular.noop,
      },
    })

    angular.mock.inject((_$compile_, _$rootScope_) => {
      $compile = _$compile_
      $rootScope = _$rootScope_
    })
  })

  function getComponent() {
    document.getElementById = () => ({
      contentWindow: {
        location: {
          href: 'https://fakeurl.com/',
        },
      },
    })
    const element = document.createElement('dp-embed-header')

    scope = $rootScope.$new()

    const component = $compile(element)(scope)
    scope.$digest()

    return component
  }

  it('updates the values in the form', () => {
    const component = getComponent()
    expect(
      component.find(
        '.qa-embed-header-form-link .qa-embed-header-form-input',
      )[0].value,
    ).toBe('https://fakeurl.com/')
    expect(
      component.find(
        '.qa-embed-header-form-html .qa-embed-header-form-input',
      )[0].value,
    ).toBe(
      '<iframe width="500" height="400" src="https://fakeurl.com/" frameborder="0"></iframe>',
    )
  })
})
