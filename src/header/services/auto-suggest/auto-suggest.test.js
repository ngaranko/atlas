import autoSuggestDataService from './auto-suggest';
import { getByUrl } from '../../../shared/services/api/api';

jest.mock('../../shared/services/api/api');

describe('The auto-suggest service', () => {
  let mockedResults;

  beforeEach(() => {
    mockedResults = [
      {
        label: 'Straatnamen (1)',
        content: [
          {
            _display: 'Linnaeusstraat (427 adressen)',
            query: 'Linnaeusstraat',
            uri: 'bag/openbareruimte/123'
          }
        ]
      }, {
        label: 'Adressen (2)',
        content: [
          {
            _display: 'Linnaeusstraat 1',
            query: 'Linnaeusstraat 1',
            uri: 'bag/verblijfsobject/123'
          },
          {
            _display: 'Linnaeusstraat 2',
            query: 'Linnaeusstraat 2',
            uri: 'bag/verblijfsobject/124'
          }
        ]
      }
    ];

    getByUrl.mockImplementation(() => Promise.resolve(mockedResults));
  });

  afterEach(() => {
    getByUrl.mockReset();
  });

  it('can search and format data', () => {
    let suggestions;

    autoSuggestDataService.search('linnae').then((data) => {
      suggestions = data;
    }).then(() => {
      expect(suggestions.count).toBe(3);
      expect(suggestions.query).toBe('linnae');
      expect(suggestions.data.length).toBe(2);

      expect(suggestions.data[0].label).toBe('Straatnamen (1)');
      expect(suggestions.data[0].content.length).toBe(1);

      expect(suggestions.data[0].content[0].label).toBe('Linnaeusstraat (427 adressen)');
      expect(suggestions.data[0].content[0].uri).toBe('bag/openbareruimte/123');
      expect(suggestions.data[0].content[0].index).toBe(0);

      expect(suggestions.data[1].label).toBe('Adressen (2)');
      expect(suggestions.data[1].content.length).toBe(2);

      expect(suggestions.data[1].content[0].label).toBe('Linnaeusstraat 1');
      expect(suggestions.data[1].content[0].uri).toBe('bag/verblijfsobject/123');
      expect(suggestions.data[1].content[0].index).toBe(1);

      expect(suggestions.data[1].content[1].label).toBe('Linnaeusstraat 2');
      expect(suggestions.data[1].content[1].uri).toBe('bag/verblijfsobject/124');
      expect(suggestions.data[1].content[1].index).toBe(2);
    });
  });
});
