import fetchByUri, { fetchGrexStadsdeel } from './gebieden-stadsdeel';
import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';
import { getByUrl } from '../api/api';

jest.mock('../geo-json/geo-json');
jest.mock('../coordinate-reference-system/crs-converter');
jest.mock('../api/api', () => ({
  __esModule: true,
  getByUrl: jest.fn().mockReturnValue({
    totaal_baten_display: 'some value',
    totaal_kosten_display: 'some value',
    totaal_resultaat_display: 'some value'
  })
}));

describe('The gebieden stadsdeel resource', () => {
  afterEach(() => {
    fetch.mockReset();
  });

  describe('fetchGrexStadsdeel', () => {
    it('should call getByUrl', async () => {
      await fetchGrexStadsdeel('123456');
      expect(getByUrl).toHaveBeenCalledWith('https://acc.api.data.amsterdam.nl/grondexploitatie/stadsdeel/123456/');
    });
  });

  describe('By uri', () => {
    it('fetches a stadsdeel', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/gebieden/stadsdeel/123456';

      fetch.mockResponseOnce(JSON.stringify({
        geometrie: { type: 'Point' },
        naam: 'Stadsdeel display name 1',
        code: 'A',
        something: 'abc123'
      }));
      getCenter.mockImplementation(() => ({ x: 1, y: 2 }));
      rdToWgs84.mockImplementation(() => ({ latitude: 3, longitude: 4 }));

      const promise = fetchByUri(uri).then((response) => {
        expect(response).toEqual({
          geometrie: { type: 'Point' },
          label: 'Stadsdeel display name 1',
          location: { latitude: 3, longitude: 4 },
          naam: 'Stadsdeel display name 1',
          code: 'A',
          something: 'abc123'
        });
      });

      expect(fetch.mock.calls[0][0]).toBe(uri);
      return promise;
    });

    it('fetches a stadsdeel object extended with grex data', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/gebieden/stadsdeel/123456';

      fetch.mockResponseOnce(JSON.stringify({
        geometrie: { type: 'Point' },
        naam: 'Stadsdeel display name 1',
        code: 'A',
        something: 'abc123'
      }));
      getCenter.mockImplementation(() => ({ x: 1, y: 2 }));
      rdToWgs84.mockImplementation(() => ({ latitude: 3, longitude: 4 }));

      const promise = fetchByUri(uri, { scopes: ['GREX/R'] }).then((response) => {
        expect(response).toEqual({
          geometrie: { type: 'Point' },
          label: 'Stadsdeel display name 1',
          location: { latitude: 3, longitude: 4 },
          naam: 'Stadsdeel display name 1',
          code: 'A',
          something: 'abc123',
          grex: {
            totalExpenseLabel: 'some value',
            totalIncomeLabel: 'some value',
            totalResultLabel: 'some value'
          }
        });
      });

      return promise;
    });

    it('fetches with empty result object', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/gebieden/stadsdeel/123456';

      fetch.mockResponseOnce(JSON.stringify({}));

      const promise = fetchByUri(uri).then((response) => {
        expect(response).toEqual({
          label: undefined,
          code: undefined,
          location: null
        });
      });

      expect(fetch.mock.calls[0][0]).toBe(uri);
      return promise;
    });
  });
});
