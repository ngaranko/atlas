import formatDetailData, { formatData } from './data-formatter'

describe('The formatData service', () => {
  it('returns the original data for non-API data', () => {
    const result = formatData('aap')
    expect(result).toBe('aap')
  })

  it('returns an empty object for evenementen ', () => {
    const result = formatData('', 'evenementen')
    expect(result).toEqual({})
  })

  it('uses catalogFiltes to format dcat data', () => {
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
    const result = formatData(data, 'datasets', catalogFilters)
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

  it('returns an empty object when the resourceTypes are not provided to format dcat data', () => {
    const catalogFilters = {}
    const result = formatData({}, 'datasets', catalogFilters)
    expect(result).toEqual({})
  })
})

describe('formatDetailData ', () => {
  const data = {
    'dcat:title': 'title',
    'dcat:distribution': [
      {
        'ams:resourceType': 'resourceTypeId',
      },
    ],
  }
  const category = 'dcatd'
  const subject = 'datasets'
  const catalogFilters = {
    resourceTypes: [
      {
        id: 'resourceTypeId',
        label: 'label',
      },
    ],
  }

  it('should return the data unchanged when not formating dcatd results', () => {
    const result = formatDetailData(data, 'no-dcatd')
    expect(result).toEqual(data)
  })

  it('should mark the result data as not editable when no write rights received', () => {
    const result = formatDetailData(data, category, subject, catalogFilters, [
      'BRK/RO',
      'BRK/RS',
      'BRK/RSN',
    ])
    expect(result.canEditDataset).toBeFalsy()
  })

  it('should mark the result data as editable when write rights received', () => {
    const result = formatDetailData(data, category, subject, catalogFilters, ['CAT/W'])
    expect(result.canEditDataset).toBeTruthy()
  })

  it('should convert the mark down fields to html', () => {
    const description = `Het BBGA bevat meer dan 500 variabelen ingedeeld naar de volgende thema's:
        -   Bevolking
        -   Leeftijd
        -   Wonen `
    const rawData = {
      ...data,
      'dct:description': description,
      'overheid:grondslag': description,
      'overheidds:doel': description,
    }
    const result = formatDetailData(rawData, category, subject, catalogFilters, ['CAT/W'])
    expect(result['dct:description']).toContain('<p>')
    expect(result['dct:description']).toContain('</p>')
    expect(result['overheid:grondslag']).toContain('<p>')
    expect(result['overheid:grondslag']).toContain('</p>')
    expect(result['overheidds:doel']).toContain('<p>')
    expect(result['overheidds:doel']).toContain('</p>')
  })
})
