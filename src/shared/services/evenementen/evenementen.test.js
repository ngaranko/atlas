import fetchByUri from './evenementen';
import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

import { getByUrl } from '../api/api';

jest.mock('../geo-json/geo-json');
jest.mock('../api/api');
jest.mock('../coordinate-reference-system/crs-converter');

describe('The evenement resource', () => {
  describe('By uri', () => {
    afterEach(() => {
      getByUrl.mockReset();
      rdToWgs84.mockReset();
    });

    it('fetches an evenement', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/vsd/evenementen/123456';

      getByUrl.mockReturnValueOnce(Promise.resolve({
        titel: 'evenement titel',
        wkb_geometriy: { type: 'Point' },
        id: '123456'
      }));
      getCenter.mockImplementation(() => ({ x: 1, y: 2 }));
      rdToWgs84.mockImplementation(() => ({ latitude: 3, longitude: 4 }));

      const promise = fetchByUri(uri).then((response) => {
        expect(response).toEqual({
          label: 'evenement titel',
          id: '123456',
          titel: 'evenement titel',
          wkb_geometriy: { type: 'Point' },
          location: { latitude: 3, longitude: 4 }
        });
      });

      expect(getByUrl).toHaveBeenCalledWith(uri);
      return promise;
    });

    it('fetches with empty result object', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/vsd/evenementen/123456';

      getByUrl.mockReturnValueOnce(Promise.resolve({}));

      const promise = fetchByUri(uri).then((response) => {
        expect(response).toEqual({
          label: undefined,
          location: undefined
        });
      });

      expect(getByUrl).toHaveBeenCalledWith(uri);
      return promise;
    });
  });
});
