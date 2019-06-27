describe('The dataFormatter factory', function() {
  let dataFormatter

  beforeEach(function() {
    angular.mock.module('dpDetail')

    angular.mock.inject(function(_dataFormatter_) {
      dataFormatter = _dataFormatter_
    })
  })

  it('returns the original data for non-API data', function() {
    const result = dataFormatter.formatData('aap')
    expect(result).toBe('aap')
  })

  it('uses catalogFiltes to format dcat data', function() {
    const data = {
      'dcat:title': 'title',
      'dcat:distribution': [
        {
          'ams:resourceType': 'resourceTypeId',
        },
      ],
    }
    const catalogFilters = {
      resourceTypes: [
        {
          id: 'resourceTypeId',
          label: 'label',
        },
      ],
    }
    const result = dataFormatter.formatData(data, 'datasets', catalogFilters)
    expect(result).toBeTruthy()
    expect(result['dcat:distribution']).toBe(undefined)
    expect(result).toEqual({
      _display: undefined,
      'dcat:title': 'title',
      resources: [
        {
          type: 'resourceTypeId',
          rows: [{ 'ams:resourceType': 'resourceTypeId' }],
        },
      ],
      editDatasetId: undefined,
    })
  })

  it('returns an empty object when the resourceTypes are not provided to format dcat data', function() {
    const catalogFilters = {}
    const result = dataFormatter.formatData({}, 'datasets', catalogFilters)
    expect(result).toEqual({})
  })
})
