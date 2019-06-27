describe('The dp-parent-relations directive', function() {
  let $compile
  let $rootScope
  let mockedContent

  beforeEach(function() {
    angular.mock.module('dpDetail', function($provide) {
      $provide.factory('dpLinkDirective', function() {
        return {}
      })
    })

    angular.mock.inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_
      $rootScope = _$rootScope_
    })

    mockedContent = {
      stadsdeel: {
        _display: 'Centrum',
        _links: {
          self: {
            href: 'https://acc.data.amsterdam.nl/bag/stadsdeel/1',
          },
        },
      },
      buurtcombinatie: {
        _display: 'Burgwallen',
        _links: {
          self: {
            href: 'https://acc.data.amsterdam.nl/bag/buurtcombinatie/1',
          },
        },
      },
      buurt: {
        _display: 'Oude Kerk',
        _links: {
          self: {
            href: 'https://acc.data.amsterdam.nl/bag/buurt/1',
          },
        },
      },
      bouwblok: {
        _display: 'YA77',
        _links: {
          self: {
            href: 'https://acc.data.amsterdam.nl/bag/bouwblok/1',
          },
        },
      },
      gebiedsgerichtwerken: {
        _display: 'Centrum-West',
        _links: {
          self: {
            href: 'https://acc.data.amsterdam.nl/bag/ggw/1',
          },
        },
      },
      grootstedelijkgebied: {
        _display: 'Noordzuidlijn',
        _links: {
          self: {
            href: 'https://acc.data.amsterdam.nl/bag/gsg/1',
          },
        },
      },
    }
  })

  function getDirective(content) {
    const element = document.createElement('dp-parent-relations')
    element.setAttribute('content', 'content')

    const scope = $rootScope.$new()
    scope.content = content

    const directive = $compile(element)(scope)
    scope.$apply()

    return directive
  }

  it('creates a list of parent entities', function() {
    const content = angular.copy(mockedContent)

    const directive = getDirective(content)

    expect(directive.find('dl').length).toBe(1)
    expect(directive.find('dt').length).toBe(6)
    expect(directive.find('dd').length).toBe(6)

    expect(
      directive
        .find('dt:nth-of-type(1)')
        .text()
        .trim(),
    ).toBe('Stadsdeel')
    expect(
      directive
        .find('dd:nth-of-type(1)')
        .text()
        .trim(),
    ).toBe('Centrum')

    expect(
      directive
        .find('dt:nth-of-type(2)')
        .text()
        .trim(),
    ).toBe('Wijk')
    expect(
      directive
        .find('dd:nth-of-type(2)')
        .text()
        .trim(),
    ).toBe('Burgwallen')

    expect(
      directive
        .find('dt:nth-of-type(3)')
        .text()
        .trim(),
    ).toBe('Buurt')
    expect(
      directive
        .find('dd:nth-of-type(3)')
        .text()
        .trim(),
    ).toBe('Oude Kerk')

    expect(
      directive
        .find('dt:nth-of-type(4)')
        .text()
        .trim(),
    ).toBe('Bouwblok')
    expect(
      directive
        .find('dd:nth-of-type(4)')
        .text()
        .trim(),
    ).toBe('YA77')

    expect(
      directive
        .find('dt:nth-of-type(5)')
        .text()
        .trim(),
    ).toBe('Gebiedsgericht werken')
    expect(
      directive
        .find('dd:nth-of-type(5)')
        .text()
        .trim(),
    ).toBe('Centrum-West')

    expect(
      directive
        .find('dt:nth-of-type(6)')
        .text()
        .trim(),
    ).toBe('Grootstedelijk gebied')
    expect(
      directive
        .find('dd:nth-of-type(6)')
        .text()
        .trim(),
    ).toBe('Noordzuidlijn')
  })

  it("doesn't show missing relations", function() {
    const content = angular.copy(mockedContent)

    delete content.grootstedelijkgebied
    const directive = getDirective(content)

    expect(directive.find('dl').length).toBe(1)
    expect(directive.find('dt').length).toBe(5)
    expect(directive.find('dd').length).toBe(5)
  })

  it('supports API data with and without prefix underscores', function() {
    const content = angular.copy(mockedContent)
    const data = angular.copy(content.grootstedelijkgebied)

    delete content.grootstedelijkgebied
    content._grootstedelijkgebied = data
    const directive = getDirective(content)

    expect(directive.find('dl').length).toBe(1)
    expect(directive.find('dt').length).toBe(6)
    expect(directive.find('dd').length).toBe(6)

    expect(
      directive
        .find('dt:nth-of-type(6)')
        .text()
        .trim(),
    ).toBe('Grootstedelijk gebied')
    expect(
      directive
        .find('dd:nth-of-type(6)')
        .text()
        .trim(),
    ).toBe('Noordzuidlijn')
  })
})
