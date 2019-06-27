describe('The dp-meetbout-graph directive', () => {
  let api
  let $rootScope
  let $compile
  let $q
  const mockedResponse = {
    results: [
      {
        _display: '41278',
        id: '41278',
        datum: '2001-12-04',
        zakking: 0.0,
        hoogte_nap: 2.7125,
        zakkingssnelheid: 0.0,
        zakking_cumulatief: 0.0,
        dataset: 'meetbouten',
      },
      {
        _display: '52380',
        id: '52380',
        datum: '2003-12-01',
        zakking: 4.7999999999999,
        hoogte_nap: 2.7077,
        zakkingssnelheid: 2.4099037138927,
        zakking_cumulatief: 4.7999999999999,
        dataset: 'meetbouten',
      },
      {
        _display: '55039',
        id: '55039',
        datum: '2005-04-11',
        zakking: 2.1999999999998,
        hoogte_nap: 2.7055,
        zakkingssnelheid: 2.0874183006535,
        zakking_cumulatief: 6.9999999999997,
        dataset: 'meetbouten',
      },
    ],
  }

  beforeEach(() => {
    angular.mock.module('dpDetail', {
      api: {
        getByUrl: () => {
          const deferred = $q.defer()

          deferred.resolve(mockedResponse)

          return deferred.promise
        },
      },
    })

    angular.mock.inject(function(_api_, _$rootScope_, _$compile_, _$q_) {
      api = _api_
      $rootScope = _$rootScope_
      $compile = _$compile_
      $q = _$q_
    })
  })

  function getGraphDirective(href, pageSize) {
    const html = document.createElement('dp-meetbout-graph')
    html.setAttribute('href', href)
    html.setAttribute('page-size', 'pageSize')

    const scope = $rootScope.$new()
    scope.pageSize = pageSize

    const directive = $compile(html)(scope)
    scope.$digest()

    // Resolve the promises with $apply()
    $rootScope.$apply()

    return directive
  }

  describe('Alleen een grafiek tonen met 2 of meer metingen', () => {
    it('should not display an svg on the screen when the pageSize is less then 2', () => {
      const directive = getGraphDirective(
        'https://api.data.amsterdam.nl/meetbouten/meting/?meetbout=10581097',
        1,
      )
      const svgContainer = directive.find('svg')

      expect(svgContainer).not.toExist()
    })

    it('should display an svg on the screen when the pageSize is 2 or more ', () => {
      const directive = getGraphDirective(
        'https://api.data.amsterdam.nl/meetbouten/meting/?meetbout=10581097',
        3,
      )
      const svgContainer = directive.find('svg')

      expect(svgContainer).toExist()
    })
  })

  describe('Load Data', () => {
    it('should load data through the api', () => {
      spyOn(api, 'getByUrl').and.callThrough()

      getGraphDirective('apiHrefA', 2)
      expect(api.getByUrl).toHaveBeenCalled()

      getGraphDirective('apiHrefB', 5)
      expect(api.getByUrl).toHaveBeenCalled()
    })
  })

  describe('Dom manipulation', () => {
    describe('append Svg and g element to create the space for the graph', () => {
      it('should have added a svg to the page', () => {
        const directive = getGraphDirective(
          'https://api.data.amsterdam.nl' +
            '/meetbouten/meting/?meetbout=10581097',
          3,
        )
        const svgContainer = directive.find('svg')

        expect(svgContainer).toExist()
        expect(svgContainer.attr('class')).toBe('c-meetbout')
        expect(svgContainer.attr('width')).toBe('750')
        expect(svgContainer.attr('height')).toBe('400')
      })

      it('should have added a g element for whitespace to the svg', () => {
        const directive = getGraphDirective(
          'https://api.data.amsterdam.nl' +
            '/meetbouten/meting/?meetbout=10581097',
          3,
        )
        const gContainer = directive.find('svg > g')

        expect(gContainer).toExist()
        expect(gContainer.attr('transform')).toBe('translate(35,15)')
      })
    })

    describe('background as', () => {
      it('should have appended a background to the svg g:transform element ', () => {
        const directive = getGraphDirective(
          'https://api.data.amsterdam.nl' +
            '/meetbouten/meting/?meetbout=10581097',
          3,
        )
        const background = directive.find(
          'svg > g > g.c-meetbout__background rect',
        )

        expect(background).toExist()
        expect(background.attr('width')).toBe('655')
        expect(background.attr('height')).toBe('355')
      })
    })

    describe('x as', () => {
      it('should have appended a x axis to the svg g:transform element ', () => {
        const directive = getGraphDirective(
          'https://api.data.amsterdam.nl' +
            '/meetbouten/meting/?meetbout=10581097',
          3,
        )
        const xAs = directive.find('svg > g > g.c-meetbout__axis-x')

        expect(xAs).toExist()
        expect(xAs.attr('class')).toBe('c-meetbout__axis c-meetbout__axis-x')
        expect(xAs.attr('transform')).toBe('translate(0,355)')

        expect(xAs.find('.tick line').length).toBe(16)
        expect(xAs.find('.tick.c-meetbout__axis-x-year line').length).toBe(4)
        expect(xAs.find('.tick text').length).toBe(16)
        expect(xAs.find('.tick.c-meetbout__axis-x-year text').length).toBe(4)
      })
    })

    describe('y as links zakking cumulatief', () => {
      it('should have appended a y axis for zakking cumulatief to the svg g:transform element ', () => {
        const directive = getGraphDirective(
          'https://api.data.amsterdam.nl' +
            '/meetbouten/meting/?meetbout=10581097',
          3,
        )
        const yZakkingCum = directive.find('svg > g > g.c-meetbout__axis-y')

        expect(yZakkingCum).toExist()
        expect(yZakkingCum.attr('class')).toBe(
          'c-meetbout__axis c-meetbout__axis-y',
        )
        expect(yZakkingCum.attr('transform')).toBeUndefined()

        expect(yZakkingCum.find('.tick line').length).toBe(8)
        expect(yZakkingCum.find('.tick text').length).toBe(8)
      })
    })

    describe('lijn voor grafiek zakking cumulatief', () => {
      it('should plot a line to represent the zakking cumulatief of the meetbout', () => {
        const directive = getGraphDirective(
          'https://api.data.amsterdam.nl' +
            '/meetbouten/meting/?meetbout=10581097',
          3,
        )
        const line = directive.find('svg > g > path.c-meetbout__line')

        expect(line).toExist()
        expect(line.attr('class')).toBe(
          'c-meetbout__line c-meetbout__line--zakking-cum',
        )
        expect(line.attr('transform')).toBeUndefined()
      })
    })
  })
})
