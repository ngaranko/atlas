describe('The dp-bbga-graphs directive', function() {
  let $compile
  let $rootScope
  let $q
  let BBGA
  let bbgaDataService
  let fakeBbgaPersonenGraph
  let fakeBbgaHuizenGraph

  beforeEach(function() {
    angular.mock.module('dpDetail', function($provide) {
      $provide.factory('dpBbgaTevredenheidDirective', function() {
        return {}
      })
    })

    angular.mock.inject(function(_$compile_, _$rootScope_, _$q_, _BBGA_, _bbgaDataService_) {
      $compile = _$compile_
      $rootScope = _$rootScope_
      $q = _$q_
      BBGA = _BBGA_
      bbgaDataService = _bbgaDataService_
    })

    fakeBbgaPersonenGraph = {
      create() {},
    }

    fakeBbgaHuizenGraph = {
      create() {},
    }

    spyOn(bbgaDataService, 'getGraphData').and.callFake(function(graphName) {
      const q = $q.defer()

      if (graphName === 'PERSONEN') {
        q.resolve('fakePersonenData')
      } else {
        q.resolve('fakeHuizenData')
      }

      return q.promise
    })

    spyOn(BBGA, 'Personen').and.returnValue(fakeBbgaPersonenGraph)
    spyOn(BBGA, 'Huizen').and.returnValue(fakeBbgaHuizenGraph)

    spyOn(fakeBbgaPersonenGraph, 'create').and.callThrough()
    spyOn(fakeBbgaHuizenGraph, 'create').and.callThrough()
  })

  function getDirective(heading, code) {
    const element = document.createElement('dp-bbga-graphs')
    element.setAttribute('gebied-heading', heading)
    element.setAttribute('gebied-code', code)

    const scope = $rootScope.$new()

    const directive = $compile(element)(scope)
    scope.$apply()

    return directive
  }

  it('loads two third party visualisations', function() {
    const directive = getDirective('Haveneiland Noordoost', 'M35f')
    const personenDomElement = directive[0].querySelector('.js-personen-graph')
    const huizenDomElement = directive[0].querySelector('.js-huizen-graph')

    expect(fakeBbgaPersonenGraph.create).toHaveBeenCalledWith(
      personenDomElement,
      'fakePersonenData',
    )
    expect(fakeBbgaHuizenGraph.create).toHaveBeenCalledWith(huizenDomElement, 'fakeHuizenData')
  })

  it('retrieves data for each visualisation based on the gebied-heading and gebied-code', function() {
    getDirective('Haveneiland Noordoost', 'M35f')

    expect(bbgaDataService.getGraphData).toHaveBeenCalledTimes(2)
    expect(bbgaDataService.getGraphData).toHaveBeenCalledWith(
      'PERSONEN',
      'Haveneiland Noordoost',
      'M35f',
    )
    expect(bbgaDataService.getGraphData).toHaveBeenCalledWith(
      'HUIZEN',
      'Haveneiland Noordoost',
      'M35f',
    )
  })
})
