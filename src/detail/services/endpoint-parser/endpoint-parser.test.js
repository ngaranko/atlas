import { getParts, toGlossaryKey, getTemplateUrl } from './endpoint-parser';

describe('The endpointParser', () => {

  describe('getParts', () => {
    it('returns the category and subject based on an endpoint', () => {
      expect(
        getParts(
          'https://api.data.amsterdam.nl/bag/nummeraanduiding/123456/',
        ),
      ).toEqual(['bag', 'nummeraanduiding'])

      expect(
        getParts(
          'https://api.data.amsterdam.nl/brk/object/789/',
        ),
      ).toEqual(['brk', 'object'])

      expect(
        getParts(
          'https://api.data.amsterdam.nl/meetbouten/meetbout/654/',
        ),
      ).toEqual(['meetbouten', 'meetbout'])

      expect(
        getParts(
          'https://api.data.amsterdam.nl/brk/object-wkpb/' +
            'NL.KAD.OnroerendeZaak.123456/',
        ),
      ).toEqual(['brk', 'object-wkpb'])

      expect(
        getParts(
          'https://api.data.amsterdam.nl/folder-1/folder-2/folder-3/123/',
        ),
      ).toEqual(['folder-2', 'folder-3'])

      expect(
        getParts('https://data.amsterdam.nl/dcatd/datasets/id'),
      ).toEqual(['dcatd', 'datasets'])
    })

    it('should return the grex parts', () => {
      const endpoint = 'https://acc.api.data.amsterdam.nl/grondexploitatie/project/78701/';
      expect(getParts(endpoint)).toEqual(["grondexploitatie", "project"])
    })

    it('should return the brk parts', () => {
      const endpoint = 'https://acc.api.data.amsterdam.nl/brk/zakelijk-recht/subject/';
      expect(getParts(endpoint)).toEqual(["brk", "subject"])
    })

    it('should return the brk parts', () => {
      const endpoint = 'https://acc.api.data.amsterdam.nl/brk/object/NL.KAD.OnroerendeZaak.11460762370000/';
      expect(getParts(endpoint)).toEqual(["brk", "object"])
    })

  })

  describe('getTemplateUrl', () => {
    it('returns a template URL based on an endpoint', () => {
      expect(
        getTemplateUrl(
          'https://api.data.amsterdam.nl/bag/nummeraanduiding/123456/',
        ),
      ).toBe(
        'modules/detail/components/detail/templates/bag/nummeraanduiding.html',
      )

      expect(
        getTemplateUrl(
          'https://api.data.amsterdam.nl/brk/object/789/',
        ),
      ).toBe('modules/detail/components/detail/templates/brk/object.html')

      expect(
        getTemplateUrl(
          'https://api.data.amsterdam.nl/meetbouten/meetbout/654/',
        ),
      ).toBe(
        'modules/detail/components/detail/templates/meetbouten/meetbout.html',
      )

      expect(
        getTemplateUrl(
          'https://api.data.amsterdam.nl/folder-1/folder-2/folder-3/654/',
        ),
      ).toBe(
        'modules/detail/components/detail/templates/folder-2/folder-3.html',
      )
    })

    it('has special exceptions for zakelijk recht (BRK)', () => {
      expect(
        getTemplateUrl(
          'https://api.data.amsterdam.nl/brk/zakelijk-recht/' +
            'some-id-with-numbers-123456/subject/',
        ),
      ).toBe('modules/detail/components/detail/templates/brk/subject.html')
    })

    it('has special exception for catalogus detail pageuss', () => {
      expect(
        getTemplateUrl(
          'https://data.amsterdam.nl/dcatd/datasets/id',
        ),
      ).toBe('modules/detail/components/detail/templates/dcatd/datasets.html')
    })

    it('should return the grex template url', () => {
      const endpoint = 'https://acc.api.data.amsterdam.nl/grondexploitatie/project/78701/';
      expect(getTemplateUrl(endpoint)).toEqual('modules/detail/components/detail/templates/grondexploitatie/project.html')
    })

    it('should return the brk template url', () => {
      const endpoint = 'https://acc.api.data.amsterdam.nl/brk/object/NL.KAD.OnroerendeZaak.11460762370000/';
      expect(getTemplateUrl(endpoint)).toEqual('modules/detail/components/detail/templates/brk/object.html')
    })
  })

  describe('The toGlossaryKey', () => {
    it('should return the correct key', () => {

        expect(toGlossaryKey('brk', 'object')).toEqual('OBJECT')
      expect(toGlossaryKey('grondexploitatie', 'project')).toEqual('GRONDEXPLOITATIE')
      })
  })


})
