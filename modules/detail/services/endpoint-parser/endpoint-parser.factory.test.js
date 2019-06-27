describe('The endpointParser factory', function() {
  let endpointParser

  beforeEach(function() {
    angular.mock.module('dpDetail', {
      sharedConfig: {
        API_ROOT: 'https://api.data.amsterdam.nl/',
      },
    })

    angular.mock.inject(function(_endpointParser_) {
      endpointParser = _endpointParser_
    })
  })

  describe('getParts', () => {
    it('returns the category and subject based on an endpoint', () => {
      expect(
        endpointParser.getParts(
          'https://api.data.amsterdam.nl/bag/nummeraanduiding/123456/',
        ),
      ).toEqual(['bag', 'nummeraanduiding'])

      expect(
        endpointParser.getParts(
          'https://api.data.amsterdam.nl/brk/object/789/',
        ),
      ).toEqual(['brk', 'object'])

      expect(
        endpointParser.getParts(
          'https://api.data.amsterdam.nl/meetbouten/meetbout/654/',
        ),
      ).toEqual(['meetbouten', 'meetbout'])

      expect(
        endpointParser.getParts(
          'https://api.data.amsterdam.nl/brk/object-wkpb/' +
            'NL.KAD.OnroerendeZaak.123456/',
        ),
      ).toEqual(['brk', 'object-wkpb'])

      expect(
        endpointParser.getParts(
          'https://api.data.amsterdam.nl/folder-1/folder-2/folder-3/123/',
        ),
      ).toEqual(['folder-2', 'folder-3'])

      expect(
        endpointParser.getParts('https://data.amsterdam.nl/dcatd/datasets/id'),
      ).toEqual(['dcatd', 'datasets'])
    })
  })

  describe('getTemplateUrl', () => {
    it('returns a template URL based on an endpoint', () => {
      expect(
        endpointParser.getTemplateUrl(
          'https://api.data.amsterdam.nl/bag/nummeraanduiding/123456/',
        ),
      ).toBe(
        'modules/detail/components/detail/templates/bag/nummeraanduiding.html',
      )

      expect(
        endpointParser.getTemplateUrl(
          'https://api.data.amsterdam.nl/brk/object/789/',
        ),
      ).toBe('modules/detail/components/detail/templates/brk/object.html')

      expect(
        endpointParser.getTemplateUrl(
          'https://api.data.amsterdam.nl/meetbouten/meetbout/654/',
        ),
      ).toBe(
        'modules/detail/components/detail/templates/meetbouten/meetbout.html',
      )

      expect(
        endpointParser.getTemplateUrl(
          'https://api.data.amsterdam.nl/folder-1/folder-2/folder-3/654/',
        ),
      ).toBe(
        'modules/detail/components/detail/templates/folder-2/folder-3.html',
      )
    })

    it('has special exceptions for zakelijk recht (BRK)', () => {
      expect(
        endpointParser.getTemplateUrl(
          'https://api.data.amsterdam.nl/brk/zakelijk-recht/' +
            'some-id-with-numbers-123456/subject/',
        ),
      ).toBe('modules/detail/components/detail/templates/brk/subject.html')
    })

    it('has special exception for catalogus detail pageuss', () => {
      expect(
        endpointParser.getTemplateUrl(
          'https://data.amsterdam.nl/dcatd/datasets/id',
        ),
      ).toBe('modules/detail/components/detail/templates/dcatd/datasets.html')
    })
  })

  describe('getGlossaryKey', () => {
    it('returns a glossary key (uppercased) based on an endpoint', () => {
      expect(
        endpointParser.getGlossaryKey(
          'https://api.data.amsterdam.nl/bag/nummeraanduiding/123456/',
        ),
      ).toBe('NUMMERAANDUIDING')

      expect(
        endpointParser.getGlossaryKey(
          'https://api.data.amsterdam.nl/brk/object/789/',
        ),
      ).toBe('OBJECT')

      expect(
        endpointParser.getGlossaryKey(
          'https://api.data.amsterdam.nl/meetbouten/meetbout/654/',
        ),
      ).toBe('MEETBOUT')

      expect(
        endpointParser.getGlossaryKey(
          'https://api.data.amsterdam.nl/milieuthemas/explosieven/inslag/1/',
        ),
      ).toBe('INSLAG')

      expect(
        endpointParser.getGlossaryKey(
          'https://data.amsterdam.nl/dcatd/datasets/id',
        ),
      ).toBe('DATASETS')
    })

    it('turns dashes (-) in the endpoint into underscores (_) in the glossary key', () => {
      expect(
        endpointParser.getGlossaryKey(
          'https://api.data.amsterdam.nl/brk/object-wkpb/' +
            'NL.KAD.OnroerendeZaak.123456/',
        ),
      ).toBe('OBJECT_WKPB')
    })

    it('has special exceptions for zakelijk recht (BRK)', () => {
      expect(
        endpointParser.getGlossaryKey(
          'https://api.data.amsterdam.nl/brk/zakelijk-recht/' +
            'some-id-with-numbers-123456/subject/',
        ),
      ).toBe('SUBJECT')
    })

    it('has special exception for "grondexploitatie"', () => {
      expect(
        endpointParser.getGlossaryKey(
          'https://api.data.amsterdam.nl/grondexploitatie/project/123/',
        ),
      ).toBe('GRONDEXPLOITATIE')
    })
  })
})
